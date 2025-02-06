const { Schema, model } = require('mongoose')

const { SUBJECT } = require('~/consts/models')

const subjectSchema = new Schema({
  name: {
    type: String
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
