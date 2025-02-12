const Category = require('~/models/category')

const categoryService = {
  getCategories: async (pipeline) => {
    const [response] = await Category.aggregate(pipeline)
    return response
  },

  getCategoriesNames: async (pipeline) => {
    const response = await Category.aggregate(pipeline)
    return response
  },

  getCategoryById: async (id) => {
    const category = await Category.findById(id).lean().exec()
    return category
  },

  createCategory: async (data) => {
    const { name, appearance } = data

    let category = await Category.findOne({ name })

    if (category) {
      return category
    }

    return await Category.create({
      name,
      appearance
    })
  }
}

module.exports = categoryService
