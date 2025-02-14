const router = require('express').Router({ mergeParams: true })
const { upload, handleUpload, handleImageDelete } = require('../../cloudinary')

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' })
    }
    const b64 = Buffer.from(req.file.buffer).toString('base64')

    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    const cldRes = await handleUpload(dataURI)

    res.json(cldRes)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

router.delete('/:publicId', async (req, res) => {
  const { publicId } = req.params
  if (!publicId) {
    return res.status(400).json({ message: 'No publicId provided' })
  }
  try {
    await handleImageDelete(publicId)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: 'Cloudinary deletion failed' })
    throw new Error('Failed to delete file from Cloudinary')
  }
})

module.exports = router
