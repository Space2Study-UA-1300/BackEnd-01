const router = require('express').Router({ mergeParams: true })
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { upload } = require('../../cloudinary')

const cloudinaryService = require('~/services/cloudinaryService')

router.post('/', upload.single('image'), asyncWrapper(cloudinaryService.uploadImage))

module.exports = router
