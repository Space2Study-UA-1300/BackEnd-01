const { Schema, model } = require('mongoose')

const { FIELD_CANNOT_BE_EMPTY } = require('~/consts/errors')
const { CATEGORY } = require('~/consts/models')

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')],
    unique: true
  },
  appearance: {
    icon: { type: String, default: 'assets/img/categories/default-icon.svg' },
    color: { type: String, default: '#66C42C' }
  }
})

module.exports = model(CATEGORY, categorySchema)
