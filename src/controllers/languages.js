const Language = require('~/models/languages')
const createNotFoundError = require('~/utils/errorsHelper')
const languageService = require('~/services/languages')

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

const getLanguages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || DEFAULT_PAGE
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT
    const search = req.query.search || ''

    const result = await languageService.getLanguages(page, limit, search)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
const getLanguageById = async (req, res) => {
  try {
    const { id } = req.params
    const language = await languageService.getLanguageById(id)

    if (!language) {
      return res.status(404).json({ error: 'Language not found' })
    }

    res.status(200).json(language)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const createLanguage = async (req, res) => {
  try {
    const newLanguage = await languageService.createLanguage(req.body)

    if (!newLanguage) {
      return res.status(400).json({ error: 'Invalid input or language already exists' })
    }

    res.status(201).json(newLanguage)
  } catch (error) {
    console.error('Error while creating the language:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params
    const updatedLanguage = await languageService.updateLanguage(id, req.body)

    res.status(200).json({
      message: 'Language updated successfully',
      language: updatedLanguage
    })
  } catch (error) {
    console.error('Error while updating the language:', error)

    if (error.status === 400) {
      return res.status(400).json({ error: error.message })
    }

    if (error.status === 404) {
      return res.status(404).json({ error: 'Language not found' })
    }

    res.status(500).json({ error: 'Server error' })
  }
}

const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params
    const deletedLanguage = await languageService.deleteLanguage(id)

    res.status(200).json({
      message: 'The language has been successfully deleted',
      deletedLanguage
    })
  } catch (error) {
    console.error('Error while deleting the language:', error)

    if (error.status === 404) {
      return res.status(404).json({ error: 'Language not found' })
    }

    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  getLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage
}
