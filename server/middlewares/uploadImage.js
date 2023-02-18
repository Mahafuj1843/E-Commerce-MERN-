import multer from "multer"
import sharp from 'sharp'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname)
  }
})

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupport file formate.' }, false);
  }
}

export const uploadPhoto = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldSize: 1024 * 1024 }
})

// export const productImgResize = async (req, res, next) => {
//   if (!req.files) return next()
//   else {
//     // await new Promise.all(
//     req.files.map(async (file) => {
//       const fileD = file.path
//       console.log(file.path)
//       file.path = await sharp(file.path).resize({
//         width: 300,
//         height: 300,
//         fit: 'contain',
//         position: 'center'
//       }).toFile("uploads/ajkjksdjdfkds.jpeg");
//       fs.unlink(fileD, (err) => {
//         if (err) next(err);
//       });
//     })
//     // );
//     next()
//   }
// }