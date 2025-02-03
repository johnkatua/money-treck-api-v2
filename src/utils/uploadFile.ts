import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client()

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    acl: 'public-read', // The file is publicly accessible
    key: function (req, file, cb) {
      cb(null, `avatars/${Date.now()}-${file.originalname}`)
    }
  })
})