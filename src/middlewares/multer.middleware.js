const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = file.originalname.split('.').pop();
        cb(null, `${name}_${Date.now()}.${extension}`);
    }
});

// File filter to reject GIFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif') {
        cb(new Error('GIF files are not allowed'), false);
    } else {
        cb(null, true);
    }
};

// Configure multer with fileFilter
const uploadMultiple = multer({ storage, fileFilter }).array('photos');

module.exports = {
    uploadMultiple
};
