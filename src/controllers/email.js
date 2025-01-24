// const emailService = require('~/services/email')
// const { confirmEmailService } = require('~/services/email')
const { emailService, confirmEmailService } = require('~/services/email')

const sendEmail = async (req, res) => {
  const { email, subject, text } = req.body
  const lang = req.lang

  console.log('emailService: -----------------------', emailService.sendEmail) //test clg
  console.log(`console.log: email -- ${email}`)
  console.log(`console.log: subject -- ${subject}`)
  console.log(`console.log: lang -- ${lang}`)
  console.log('console.log: text --', text)
  console.log(`typeof emailService.sendEmail-- ${typeof emailService.sendEmail}`)
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
}

module.exports = {
  sendEmail,
  confirmEmail
}
