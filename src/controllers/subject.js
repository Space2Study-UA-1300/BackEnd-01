const subjectService = require('~/services/subject')
const subjectAggregationOptions = require('~/utils/subject/subjectAggregateOptions')
const subjectsByCategoriesAggregationOptions = require('~/utils/subject/subjectsByCatogeriesAggregationOptions')

const getSubjects = async (req, res) => {
  const pipeline = await subjectAggregationOptions(req.query)
  const subjects = await subjectService.getSubjects(pipeline)

  res.status(200).json(subjects)
}

const getSubjectById = async (req, res) => {
  const { id } = req.params

  const subject = await subjectService.getSubjectById(id)

  res.status(200).json(subject)
}
const getSubjectByname = async (req, res) => {
  const { name } = req.params
  const subject = await subjectService.getSubjectByName(name)

  res.status(200).json(subject)
}

const getListOfSubjectByCategories = async (req, res) => {
  const pipeline = await subjectsByCategoriesAggregationOptions(req.query)
  const subjects = await subjectService.getSubjectsByCategories(pipeline)

  res.status(200).json(subjects)
}

const createSubject = async (req, res) => {
  const { id: categoryId, category: categoryName } = req.user
  const data = req.body

  const newSubject = await subjectService.createSubject(categoryId, categoryName, data)

  res.status(201).json(newSubject)
}

const updateSubject = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  await subjectService.updateSubject(id, updateData)

  res.status(204).end()
}

const deleteSubject = async (req, res) => {
  const { id } = req.params

  await subjectService.deleteSubject(id)

  res.status(204).end()
}

module.exports = {
  getSubjects,
  getSubjectById,
  getSubjectByname,
  getListOfSubjectByCategories,
  createSubject,
  updateSubject,
  deleteSubject
}
