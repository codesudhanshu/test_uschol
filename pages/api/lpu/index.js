import dbConnect from "../../../dbConnect";
import lpuModel from '../../../model/lpuModel';
import sendEnquiryNotification from '../../../services/email';

export default async function handler(req, res) {
    await dbConnect(); 

    if (req.method === 'POST') {
        try {
            const { name, email, phoneNumber, course, location } = req.body;

            if (!name || !email || !phoneNumber || !course || !location) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const newEntry = new lpuModel({
                name,
                email,
                phoneNumber,
                course,
                location
            });
            const college = "Lovely Professional University"
            await newEntry.save();
            await sendEnquiryNotification({ name, email, phoneNumber, college, course, location, });
            return res.status(201).json({ success: true, message: 'Data saved successfully' });

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
