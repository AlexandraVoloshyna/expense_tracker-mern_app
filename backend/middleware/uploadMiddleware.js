import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'backend/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  export const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      }, 

});