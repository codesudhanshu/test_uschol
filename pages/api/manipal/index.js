import dbConnect from "../../../dbConnect";
import manipalModel from '../../../model/manipalModel';
import sendEnquiryNotificationmaninmims from '../../../services/email';

const NEODOVE_URL = process.env.NEODOVE_URL

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, phoneNumber, location } = req.body;

    if (!name || !email || !phoneNumber || !location) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 1) Save to MongoDB
    const newEntry = new manipalModel({
      name,
      email,
      phoneNumber,
      location
    });

    const college = "Manipal University";
    const saved = await newEntry.save();

    // 2) Send internal email notification (your existing function)
    try {
      await sendEnquiryNotificationmaninmims({ name, email, phoneNumber, college, location });
    } catch (emailErr) {
      // Log but don't fail entire request because of email sending issue
      console.error('Email notify error:', emailErr?.message || emailErr);
    }

    // 3) Post to Neodove
    const neodovePayload = {
      name: String(name),
      mobile: String(phoneNumber),
      email: String(email),
      detail1: String(location),
      detail2: String(college)
    };

    let neodoveResult = { success: false, status: null, body: null };

    try {
      const resp = await fetch(NEODOVE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Add Authorization header here if Neodove requires one:
          // 'Authorization': `Bearer ${process.env.NEODOVE_TOKEN}`
        },
        body: JSON.stringify(neodovePayload),
        // you can set a timeout externally if you want; node-fetch not used here so rely on default
      });

      neodoveResult.status = resp.status;
      const respBody = await resp.text();
      neodoveResult.body = respBody;

      if (resp.ok) {
        neodoveResult.success = true;
      } else {
        neodoveResult.success = false;
        console.warn('Neodove returned non-2xx:', resp.status, respBody);
      }
    } catch (neodoveErr) {
      console.error('Error sending to Neodove:', neodoveErr?.message || neodoveErr);
      neodoveResult.error = neodoveErr?.message || String(neodoveErr);
    }

    // 4) Return response (DB saved, include Neodove result)
    return res.status(201).json({
      success: true,
      message: 'Saved to database',
      dbId: saved._id,
      neodove: neodoveResult
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}
