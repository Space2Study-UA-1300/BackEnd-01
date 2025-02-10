const getRegex = require('../getRegex')

const subjectsByCategoriesAggregationOptions = async (query) => {
  const { categoryName } = query
  const matchOptions = {}
  if (categoryName) {
    matchOptions.categoryName = getRegex(categoryName)
  }
  return [
    { $match: matchOptions },
    {
      $facet: {
        categories: [
          {
            $group: {
              _id: '$categoryName',
              subjects: { $push: '$name' }
            }
          }
        ]
      }
    }
  ]
}
module.exports = subjectsByCategoriesAggregationOptions
