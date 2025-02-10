const getRegex = require('~/utils/getRegex')
const subjectAggregationOptions = async (query) => {
  const { name, categoryName, sortBy = 'name', order = 1, skip = 0, limit = 5 } = query
  const matchOptions = {}
  const sortOptions = {}

  if (sortBy) {
    sortOptions[sortBy] = Number(order)
  }

  if (name) {
    matchOptions.name = getRegex(name)
  }
  if (categoryName) {
    matchOptions.categoryName = getRegex(categoryName)
  }

  return [
    {
      $facet: {
        totalCount: [
          {
            $count: 'subjects'
          }
        ],
        items: [
          {
            $project: {
              name: 1,
              category: 1,
              categoryName: 1
            }
          },
          { $match: matchOptions },
          { $limit: parseInt(limit) },
          { $skip: parseInt(skip) },
          { $sort: sortOptions }
        ]
      }
    }
  ]
}
module.exports = subjectAggregationOptions
