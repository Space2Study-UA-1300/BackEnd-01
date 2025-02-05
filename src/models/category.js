const { Schema, model } = require('mongoose')

const {
  enums: { CATEGORY_ICONS_ENUM }
} = require('~/consts/validation')
const { FIELD_CANNOT_BE_EMPTY, ENUM_CAN_BE_ONE_OF } = require('~/consts/errors')
const { CATEGORY } = require('~/consts/models')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('name')],
      unique: true
    },
    appearance: {
      icon: {
        type: String,
        default: 'language',
        enum: {
          values: CATEGORY_ICONS_ENUM,
          message: ENUM_CAN_BE_ONE_OF('icon', CATEGORY_ICONS_ENUM)
        }
      },
      color: { type: String, default: '#66C42C' }
    },
    offers: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
)

module.exports = model(CATEGORY, categorySchema)
