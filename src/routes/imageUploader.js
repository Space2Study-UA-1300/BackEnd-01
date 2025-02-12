const router = require('express').Router({ mergeParams: true })
const { upload, handleUpload } = require('../../cloudinary')

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64')

    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64

    const cldRes = await handleUpload(dataURI)

    res.json(cldRes)
  } catch (error) {
    console.error('Error during upload:', error.message)

    res.status(500).send({
      message: error.message
    })
  }
})

module.exports = router
