const { Schema, model } = require('mongoose')

const { SUBJECT, USER } = require('~/consts/models')

const subjectSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: USER
  },
  createdAt: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

module.exports = model(SUBJECT, subjectSchema)
