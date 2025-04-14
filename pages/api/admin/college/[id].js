import collegeModel from "../../../../model/collegeModel";
import dbConnect from "../../../../dbConnect";
import mongoose from 'mongoose';

export default async function College(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'PATCH': {
            try {
                const oldCollege = await collegeModel.findById(req.query.id);
                const { college_name, info_cards } = req.body;

                let newCollege = { ...req.body };

                if (college_name) {
                    const slug = college_name.toLowerCase().replace(/ /g, '-');
                    const check = await collegeModel.findOne({ slug, _id: { $ne: new mongoose.Types.ObjectId(req.query.id) } });

                    if (check) {
                        return res.status(400).json({ success: false, message: "College already exists" });
                    }

                    if (slug !== oldCollege.slug) {
                        newCollege.slug = slug;
                    }
                }

                if (info_cards) {
                    newCollege.info_cards = info_cards.slice(0, 3); // Only take the first 3 info cards
                }

                // Perform the update operation
                const college = await collegeModel.findByIdAndUpdate(req.query.id, newCollege, { new: true });

                res.status(200).json({ success: true, data: college });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        }

        case 'GET': {
            try {
                const college = await collegeModel.findById(req.query.id);
                if (!college) {
                    return res.status(404).json({ success: false, message: "College not found" });
                }
                res.status(200).json(college);
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        }

        default:
            res.status(400).json({ success: false, message: "Method not allowed" });
            break;
    }
}
