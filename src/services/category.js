const Category = require('~/models/category')

const categoryService = {
  createCategory: async (data) => {
    const { name, appearance } = data

    return await Category.create({
      name,
      appearance
    })
  }
}

module.exports = categoryService
