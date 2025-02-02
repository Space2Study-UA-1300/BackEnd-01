const Category = require('~/models/category')

const categoryService = {
  getCategories: async (pipeline) => {
    const [response] = await Category.aggregate(pipeline)
    return response
  },

  createCategory: async (data) => {
    const { name, appearance } = data

    return await Category.create({
      name,
      appearance
    })
  }
}

module.exports = categoryService
