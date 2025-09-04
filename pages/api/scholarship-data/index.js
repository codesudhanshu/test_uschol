import dbConnect from "../../../dbConnect";
import scholarshipfairModel from "../../../model/scholarshipfairmodel";
import  { sendEnquiryNotificationscholarshipfair } from '../../../services/email';

export default async function handler(req, res) {
    await dbConnect(); 

    if (req.method === 'POST') {
        try {
            const { name, email, phone } = req.body;

            if (!name || !email || !phone) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const newEntry = new scholarshipfairModel({
                name,
                email,
                phone,
            });

            const college = "Scholarship Fair"
            await newEntry.save();
            await sendEnquiryNotificationscholarshipfair({ name, email, phone, college });
            return res.status(201).json({ success: true, message: 'Data saved successfully' });

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
