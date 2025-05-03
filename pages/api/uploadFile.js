import S3 from "aws-sdk/clients/s3";
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export default async function Uploadfile(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { list, college_name } = req.body;

        let college = college_name.replace(/\s+/g, '-').toLowerCase();

        const promises = list.map((file) => {
          const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${college}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`,
            ContentType: file.type,
          };
          return s3.getSignedUrlPromise("putObject", fileParams);
        });

        const signedUrls = await Promise.all(promises);
        res.status(200).json(signedUrls);
      } catch (error) {
        console.error("Error generating signed URLs:", error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
      break;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb", // Adjust as needed
    },
  },
};
