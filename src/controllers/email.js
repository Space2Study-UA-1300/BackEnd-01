const emailService = require('~/services/email')
const { confirmEmailService } = require('~/services/email')

const sendEmail = async (req, res) => {
  const { email, subject, text } = req.body
  const lang = req.lang

  console.log(`emailService: -----------------------${emailService}`) //test clg

  await emailService.sendEmail(email, subject, lang, text)

  res.status(204).end()
}

const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params
    const result = await confirmEmailService(token)
    res.status(200).json({ message: 'Email confirmed successfully', result })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
  // res.status(200).json({ message: 'Controller works!', token: req.params.token })
}

module.exports = {
  sendEmail,
  confirmEmail
}
