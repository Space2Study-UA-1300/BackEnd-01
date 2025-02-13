const router = require('express').Router({ mergeParams: true })
const { upload, handleUpload, handleImageDelete } = require('../../cloudinary')

router.post('/', upload.single('image'), async (req, res) => {
  try {
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
  console.log(publicId)
  try {
    await handleImageDelete(publicId)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
})

module.exports = router
