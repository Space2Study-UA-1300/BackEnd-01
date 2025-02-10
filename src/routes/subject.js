const router = require('express').Router({ mergeParams: true })

const idValidation = require('~/middlewares/idValidation')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware } = require('~/middlewares/auth')
const isEntityValid = require('~/middlewares/entityValidation')

const subjectController = require('~/controllers/subject')
const Subject = require('~/models/subject')

const params = [{ model: Subject, idName: 'id' }]

router.use(authMiddleware)
router.param('id', idValidation)

router.get('/', asyncWrapper(subjectController.getSubjects))
router.post('/', asyncWrapper(subjectController.createSubject))
router.get('/list', asyncWrapper(subjectController.getListOfSubjectByCategories))
router.get('/:id', isEntityValid({ params }), asyncWrapper(subjectController.getSubjectById))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(subjectController.updateSubject))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(subjectController.deleteSubject))

module.exports = router
