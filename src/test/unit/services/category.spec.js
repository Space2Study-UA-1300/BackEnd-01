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

    it('should create new category with provided name', async () => {
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
        items: [
          { _id: 'mockId123', name: 'Test Category', appearance: { icon: 'test-icon', color: '#123456' }, offers: 0 }
        ],
        count: 1
      }
      Category.aggregate.mockResolvedValue([mockData])

      const result = await categoryService.getCategories()

      expect(Category.aggregate).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockData)
    })

    it('should throw an error if Category.aggregate fails', async () => {
      const mockError = new Error('Database error')
      Category.aggregate.mockRejectedValue(mockError)

      await expect(categoryService.getCategories()).rejects.toThrow('Database error')
    })
  })

  describe('Get category by id', () => {
    it('should retrive category by id', async () => {
      const mockData = {
        items: [
          { _id: 'mockId123', name: 'Test Category', appearance: { icon: 'test-icon', color: '#123456' }, offers: 0 }
        ]
      }

      Category.findById.mockReturnValue({
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockData)
      })

      const category = await categoryService.getCategoryById(mockData._id)

      expect(Category.findById).toHaveBeenCalledWith(mockData._id)
      expect(category).toEqual(mockData)
    })

    it('should throw an error if Category.findById fails', async () => {
      const mockError = new Error('Database error')
      Category.findById.mockReturnValue({
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(mockError)
      })

      await expect(categoryService.getCategoryById()).rejects.toThrow('Database error')
    })
  })
  describe('Get category names', () => {
    it('should retrive categories names', async () => {
      const mockData = [{ _id: 'mockId123', name: 'Test Category' }]

      Category.aggregate.mockResolvedValue(mockData)

      const category = await categoryService.getCategoriesNames()

      expect(Category.aggregate).toHaveBeenCalledTimes(1)
      expect(category).toEqual(mockData)
    })

    it('should throw an error if Category.aggregate fails', async () => {
      const mockError = new Error('Database error')
      Category.aggregate.mockRejectedValue(mockError)

      await expect(categoryService.getCategoriesNames()).rejects.toThrow('Database error')
    })
  })
})
