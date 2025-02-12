const subjectService = require('~/services/subject')
const subjectAggregationOptions = require('~/utils/subject/subjectAggregateOptions')

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

const createSubject = async (req, res) => {
  //if category
  // 1. category endopint
  //category id and category name
  //if category exists
  const { isCategory } = req.subject
  if (isCategory) {
    const data = req.body
    const newSubject = await subjectService.createSubject(data)
    res.status(201).json(newSubject)
  }
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
  createSubject,
  updateSubject,
  deleteSubject
}
