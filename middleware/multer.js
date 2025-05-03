import multer from 'multer';

// Configuring storage and filename for the location to grab the form provided image or pdf and store it in loal storage
// or any other storage. Here the storage is not mentioed for now
// Here by default the destination would be C:\\Users\\SHARAN~1\\AppData\\Local\\Temp\ ->Loal/temp folder
const storage = multer.diskStorage({
    filename: function (req,file,callback) {
        callback(null, file.originalname)
    }
})

// Creating upload middleware using multer
const upload = multer({storage: storage});

export default upload;