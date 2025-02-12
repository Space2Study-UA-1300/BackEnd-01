import { handleUpload } from 'cloudinary'
const cloudinaryService = {
  uploadImage: async (req, res) => {
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    let dataURI = 'data:' + req.file.mimetype + 'base64,' + b64
    const cldRes = await handleUpload(dataURI)
    res.json(cldRes)
  }
}
module.exports = cloudinaryService
