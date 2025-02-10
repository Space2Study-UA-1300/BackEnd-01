const categoryService = require('~/services/category')
const categoriesAggregateOptions = require('~/utils/categories/categoriesAggregateOptions')
const categoryNamesAggregateOptions = require('~/utils/categories/categoryNamesAggregateOptions')

const getCategories = async (req, res) => {
  const pipeline = categoriesAggregateOptions(req.query)

  const categories = await categoryService.getCategories(pipeline)

  res.status(200).json(categories)
}

const getCategoriesNames = async (req, res) => {
  const pipeline = categoryNamesAggregateOptions(req.query)

  const categoriesNames = await categoryService.getCategoriesNames(pipeline)

  res.status(200).json(categoriesNames)
}

const getCategoryById = async (req, res) => {
  const { id } = req.params

  const category = await categoryService.getCategoryById(id)

  res.status(200).json(category)
}

const createCategory = async (req, res) => {
  const data = req.body

  const newCategory = await categoryService.createCategory(data)

  res.status(201).json(newCategory)
}

module.exports = {
  getCategories,
  getCategoriesNames,
  getCategoryById,
  createCategory
}
