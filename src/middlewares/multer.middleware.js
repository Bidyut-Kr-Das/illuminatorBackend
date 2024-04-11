import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileExt = file.originalname.split(".").pop();
    cb(null, file.fieldname + `-${uniqueSuffix}.${fileExt}`);
  }
});

export const upload = multer({ storage: storage });
