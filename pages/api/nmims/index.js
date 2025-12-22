import dbConnect from "../../../dbConnect";
import nmimsModel from '../../../model/nmimsModel';
import sendEnquiryNotificationmaninmims from '../../../services/email';

const NEODOVE_URL = process.env.NEODOVE_URL;

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

    const newEntry = new nmimsModel({
      name,
      email,
      phoneNumber,
      location
    });

    const college = "NMIMS University";
    const saved = await newEntry.save();
    const course_name = ""
    // send internal email (best-effort)
    try {
      await sendEnquiryNotificationmaninmims({ name, email, phoneNumber, college, location, course_name });
    } catch (emailErr) {
      console.error('Email notify error (NMIMS):', emailErr?.message || emailErr);
    }

    // prepare payload for Neodove
    const neodovePayload = {
      name: String(name),
      mobile: String(phoneNumber),
      email: String(email),
      detail1: String(location),
      detail2: String(college)
    };

    let neodoveResult = { success: false, status: null, body: null, error: null };

    if (NEODOVE_URL) {
      try {
        const resp = await fetch(NEODOVE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(neodovePayload)
        });

        neodoveResult.status = resp.status;
        const text = await resp.text();
        neodoveResult.body = text;
        neodoveResult.success = resp.ok;
        if (!resp.ok) console.warn('Neodove (NMIMS) non-2xx:', resp.status, text);
      } catch (err) {
        console.error('Neodove send error (NMIMS):', err?.message || err);
        neodoveResult.error = err?.message || String(err);
      }
    } else {
      neodoveResult.error = 'NEODOVE_URL not configured';
    }

    return res.status(201).json({
      success: true,
      message: 'Saved to database',
      dbId: saved._id,
      neodove: neodoveResult
    });

  } catch (error) {
    console.error('Server error (NMIMS):', error);
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}
