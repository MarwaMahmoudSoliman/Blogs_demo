
const multer = require("multer")
const blogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
      const ext = file.mimetype.split("/")[1]
      const filename = `img-${Date.now()}.${ext}`
      cb(null, filename)
    }
  })
  
  const blogUpload = multer({ 
    storage: blogStorage,
    limits : {fileSize : 1024*1024*5},
    fileFilter : (req,file,cb)=>{
        const imageType = file.mimetype.split("/")[0]
        if(imageType==="image"){
           return  cb(null,true)
        }
        else{
            return("file must be image" , false)
        }
    }
 })
  
module.exports = blogUpload 