const router = require('express').Router()
const asyncWrapper = require('~/middlewares/asyncWrapper')
const Language = require('~/models/languages')

router.get(
  '/',
  asyncWrapper(async (req, res) => {
    const languages = await Language.find()
    res.json(languages)
  })
)

module.exports = router
