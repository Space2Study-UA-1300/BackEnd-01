const Subject = require('~/models/subject')

const subjectService = {
  getSubjects: async () => {
    return await Subject.find().lean().exec()
  },
  getSubjectById: async (id) => {
    return await Subject.findById(id).lean().exec()
  },
  createSubject: async (data) => {
    const { name, createdAt, updatedAt } = data
    return await Subject.create({
      name,
      createdAt,
      updatedAt
    })
  },
  updateSubject: async (id, data) => {
    const subject = await Subject.findById(id)
    const keys = Object.keys(data)
    for (let key of keys) {
      subject[key] = data[key]
    }
    await subject.validate()
    await subject.save()
  },
  deleteSubject: async (id) => {
    await Subject.findByIdAndRemove(id).exec()
  }
}
module.exports = subjectService
