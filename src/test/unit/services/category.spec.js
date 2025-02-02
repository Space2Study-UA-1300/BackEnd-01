require('~/initialization/envSetup')

const Category = require('~/models/category')
const categoryService = require('~/services/category')

jest.mock('~/models/category')

describe('Category service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Create category', () => {
    it('should create new category with valid data', async () => {
      const mockData = { name: 'Test Category', appearance: { icon: 'test-icon', color: '#123456' } }
      const mockCreatedCategory = { ...mockData, _id: 'mockId123' }
      Category.create.mockResolvedValue(mockCreatedCategory)

      const result = await categoryService.createCategory(mockData)

      expect(Category.create).toHaveBeenCalledWith(mockData)
      expect(Category.create).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockCreatedCategory)
    })

    it('should create new category with provided name only', async () => {
      const mockData = { name: 'Test Category' }
      const mockCreatedCategory = {
        ...mockData,
        appearance: { icon: '/path-to-mock.svg', color: '#123456' },
        _id: 'mockId123'
      }
      Category.create.mockResolvedValue(mockCreatedCategory)

      const result = await categoryService.createCategory(mockData)

      expect(Category.create).toHaveBeenCalledWith(mockData)
      expect(Category.create).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockCreatedCategory)
    })

    it('should throw an error if Category.create fails', async () => {
      const mockData = { name: 'Test Category', appearance: { icon: 'test-icon', color: '#123456' } }
      const mockError = new Error('Database error')
      Category.create.mockRejectedValue(mockError)

      await expect(categoryService.createCategory(mockData)).rejects.toThrow('Database error')
    })
  })

  describe('Get categories', () => {
    it('should retrieve list of categories', async () => {
      const mockData = {
        items: [{ _id: 'mockId123', name: 'Test Category', appearance: { icon: 'test-icon', color: '#123456' } }],
        count: 1
      }
      Category.aggregate.mockResolvedValue([mockData])

      const result = await categoryService.getCategories()

      expect(Category.aggregate).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockData)
    })

    it('should throw an error if Category.create fails', async () => {
      const mockError = new Error('Database error')
      Category.aggregate.mockRejectedValue(mockError)

      await expect(categoryService.getCategories()).rejects.toThrow('Database error')
    })
  })
})
