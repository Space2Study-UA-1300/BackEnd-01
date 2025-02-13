const cloudinary = require('cloudinary').v2
const Multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  })
  return res
}
async function handleImageDelete(publicId) {
  const res = await cloudinary.uploader.destroy(publicId)
  return res
}

const storage = Multer.memoryStorage()
const upload = Multer({
  storage: storage,
  limit: {
    fileSize: 1000000
  }
})

module.exports = { handleUpload, upload, handleImageDelete }
