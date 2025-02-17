const Language = require('~/models/languages')

const getLanguages = async () => {
  return await Language.find()
}

const getLanguageById = async (id) => {
  return await Language.findById(id)
}

const createLanguage = async ({ _id, name }) => {
  if (!_id || !name) return null

  const existingLanguage = await Language.findById(_id)
  if (existingLanguage) return null

  const newLanguage = new Language({ _id, name })
  await newLanguage.save()

  return newLanguage
}

const updateLanguage = async (id, updateData) => {
  const updatedLanguage = await Language.findByIdAndUpdate(id, updateData, {
    new: true
  })

  if (!updatedLanguage) {
    throw createError(404, 'Language not found')
  }

  return updatedLanguage
}

const deleteLanguage = async (id) => {
  const deletedLanguage = await Language.findByIdAndDelete(id)

  if (!deletedLanguage) {
    throw createError(404, 'Language not found')
  }

  return deletedLanguage
}

module.exports = {
  getLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage
}
