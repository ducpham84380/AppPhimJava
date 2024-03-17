const httpHandler = require("../helper/HttpHandler");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if( file.mimetype=="image/bmp" 
            || file.mimetype=="image/png"
            || file.mimetype=="image/jpg"
            || file.mimetype=="image/jpeg"
        ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("file");


const UploadFile = {
    /**
     * Get all data guidance
     * @param {request} req
     * @param {response} res
     * @return {response}
     */
    uploadFile: async (req, res) => {
        try {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return httpHandler.unauthorized(res);
                } else if (err) {
                    return httpHandler.fail(
                        res,
                        {
                            errMsg: {"error": "An unknown error occurred when uploading." + err},
                        },
                        err.message,
                    );
                }else{
                    console.log("Upload is okay");

                    return httpHandler.success(res, {filename:req.file.filename});
                }
            });
        } catch (error) {
            return httpHandler.serverError(res, error.message);
        }
    },
};
module.exports = UploadFile;
