const { Schema, model } = require('mongoose')

const { SUBJECT, USER } = require('~/consts/models')
const { FIELD_CANNOT_BE_EMPTY } = require('~/consts/errors')

const subjectSchema = new Schema({
  name: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: USER,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')]
  },
  categoryName: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')]
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
