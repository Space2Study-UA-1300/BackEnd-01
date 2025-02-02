const router = require('express').Router()

const categoryController = require('~/controllers/category')

const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware, restrictTo } = require('~/middlewares/auth')

const {
  roles: { ADMIN }
} = require('~/consts/auth')

router.use(authMiddleware)
router.get('/', asyncWrapper(categoryController.getCategories))

router.use(restrictTo(ADMIN))
router.post('/', asyncWrapper(categoryController.createCategory))

module.exports = router
