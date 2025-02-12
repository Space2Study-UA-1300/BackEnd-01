const Subject = require('~/models/subject')
const ObjectId = require('mongodb').ObjectId

const subjectService = {
  getSubjects: async (pipeline) => {
    const [response] = await Subject.aggregate(pipeline).exec()
    console.log(response)
    return response
  },
  getSubjectById: async (id) => {
    return await Subject.findById(id).lean().exec()
  },
  createSubject: async (data) => {
    const { name, createdAt, updatedAt, category, categoryName } = data
    return await Subject.create({
      name,
      createdAt,
      updatedAt,
      category,
      categoryName
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
  },
  getSubjectsByCategoryId: async (categoryId) => {
    return Subject.find({ category: ObjectId(categoryId) })
  },
  getSubjectsByFirstLetters: async (letters) => {
    return Subject.find({ name: { $regex: '^' + letters, $options: 'i' } })
  },
  getSubjectByName: async (name) => {
    return Subject.findOne({ name })
  }
}
module.exports = subjectService
