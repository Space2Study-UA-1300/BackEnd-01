const { Schema, model } = require('mongoose')
const { LANGUAGE } = require('~/consts/models')

const languageSchema = new Schema(
  {
    _id: {
      type: String, // Код языка (например, "en", "de")
      required: [true, "Field '_id' cannot be empty"]
    },
    name: {
      type: String, // Название языка (например, "English", "Deutsch")
      required: [true, "Field 'name' cannot be empty"],
      minLength: [2, "Field 'name' must have at least 2 characters"],
      maxLength: [100, "Field 'name' cannot exceed 100 characters"]
    }
  },
  {
    timestamps: true, // createdAt и updatedAt
    versionKey: false // Отключает __v
  }
)

module.exports = model(LANGUAGE, languageSchema)
