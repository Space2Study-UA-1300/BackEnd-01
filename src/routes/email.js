const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const langMiddleware = require('~/middlewares/appLanguage')

const emailController = require('~/controllers/email')

router.post('/', langMiddleware, asyncWrapper(emailController.sendEmail))

//v1
// router.get('/confirm-email/:token', asyncWrapper(emailController.confirmEmail))

//v2
// router.get('/confirm-email/:token', (req, res) => {
//   res.status(200).json({
//     message: 'Router works!',
//     token: req.params.token
//   })
// })

//v3
router.get('/confirm-email/:token', emailController.confirmEmail)

module.exports = router
