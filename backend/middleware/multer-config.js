const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const storage = new GridFsStorage({
  url: 'mongodb+srv://arthur:TheMilkyWay2906@cluster0.zxke9.mongodb.net/fisheyesDB?retryWrites=true&w=majority',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4']
    if (match.indexOf(file.mimetype) === -1) {
      return file.originalname
    }
    return {
      bucketName: 'photos',
      filename: file.originalname
    }
  }
})

module.exports = multer({ storage })
