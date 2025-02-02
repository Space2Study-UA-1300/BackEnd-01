require('~/initialization/envSetup')

const Category = require('~/models/category')
const categoryService = require('~/services/category')

jest.mock('~/models/category')

describe('Category service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Category creation', () => {
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
})
