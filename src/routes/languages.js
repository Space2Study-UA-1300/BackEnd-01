const router = require('express').Router()
const asyncWrapper = require('~/middlewares/asyncWrapper')
const Language = require('~/models/languages')
const isEntityValid = require('~/middlewares/entityValidation')

const languageController = require('~/controllers/languages')

const params = [{ model: Language, idName: 'id' }]

router.get('/', asyncWrapper(languageController.getLanguages))
router.get('/:id', isEntityValid({ params }), asyncWrapper(languageController.getLanguageById))
router.post('/', asyncWrapper(languageController.createLanguage))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(languageController.updateLanguage))
router.delete('/:id', isEntityValid({ params }), asyncWrapper(languageController.deleteLanguage))

module.exports = router
