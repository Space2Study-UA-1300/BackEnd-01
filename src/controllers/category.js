const categoryService = require('~/services/category')
const categoriesAggregateOptions = require('~/utils/categories/categoriesAggregateOptions')

const getCategories = async (req, res) => {
  const pipeline = categoriesAggregateOptions(req.query)

  const offers = await categoryService.getCategories(pipeline)

  res.status(200).json(offers)
}

const createCategory = async (req, res) => {
  const data = req.body

  const newCategory = await categoryService.createCategory(data)

  res.status(201).json(newCategory)
}

module.exports = {
  getCategories,
  createCategory
}
