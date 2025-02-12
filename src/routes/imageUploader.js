const router = require('express').Router({ mergeParams: true })
const asyncWrapper = require('~/middlewares/asyncWrapper')
import { upload } from 'cloudinary'

const cloudinaryService = require('~/services/cloudinaryService')

router.post('/upload-image', upload.single('image'), asyncWrapper(cloudinaryService.uploadImage))

module.exports = router
