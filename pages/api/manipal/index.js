import dbConnect from "../../../dbConnect";
import manipalModel from "../../../model/manipalModel";
import sendEnquiryNotificationmaninmims from "../../../services/email";

const NEODOVE_URL = process.env.NEODOVE_URL;

// ================= CORS HELPER =================
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
// ==============================================

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await dbConnect();

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  try {
    // 👇 course_name OPTIONAL
    const { name, email, phoneNumber, location, course_name } = req.body;

    // ❗ course_name intentionally NOT validated
    if (!name || !email || !phoneNumber || !location) {
      return res.status(400).json({
        success: false,
        message: "name, email, phoneNumber, location are required",
      });
    }

    // 1️⃣ Save to MongoDB
    const newEntry = new manipalModel({
      name,
      email,
      phoneNumber,
      location,
      ...(course_name && { course_name }), // ✅ optional save
    });

    const college = "Manipal University";
    const saved = await newEntry.save();

    // 2️⃣ Email notification
    try {
      await sendEnquiryNotificationmaninmims({
        name,
        email,
        phoneNumber,
        college,
        location,
        ...(course_name && { course_name }), // ✅ optional email
      });
    } catch (emailErr) {
      console.error("Email notify error:", emailErr);
    }

    // 3️⃣ Neodove payload
    const neodovePayload = {
      name: String(name),
      mobile: String(phoneNumber),
      email: String(email),
      detail1: String(location),
      detail2: String(college),
      ...(course_name && { detail3: String(course_name) }), // ✅ optional
    };

    let neodoveResult = { success: false };

    try {
      const resp = await fetch(NEODOVE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(neodovePayload),
      });

      const respText = await resp.text();
      neodoveResult = {
        success: resp.ok,
        status: resp.status,
        body: respText,
      };
    } catch (err) {
      console.error("Neodove error:", err);
      neodoveResult = { success: false, error: err.message };
    }

    // 4️⃣ Final response
    return res.status(201).json({
      success: true,
      message: "Saved successfully",
      dbId: saved._id,
      course_name: course_name || null,
      neodove: neodoveResult,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}
