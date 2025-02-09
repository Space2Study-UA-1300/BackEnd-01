const router = require('express').Router()

const idValidation = require('~/middlewares/idValidation')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware, restrictTo } = require('~/middlewares/auth')
const isEntityValid = require('~/middlewares/entityValidation')

const categoryController = require('~/controllers/category')
const Category = require('~/models/category')

const {
  roles: { ADMIN }
} = require('~/consts/auth')

const params = [{ model: Category, idName: 'id' }]

router.use(authMiddleware)

router.param('id', idValidation)

router.get('/', asyncWrapper(categoryController.getCategories))
router.get('/names', asyncWrapper(categoryController.getCategoriesNames))
router.get('/:id', isEntityValid({ params }), asyncWrapper(categoryController.getCategoryById))

router.use(restrictTo(ADMIN))
router.post('/', asyncWrapper(categoryController.createCategory))

module.exports = router
