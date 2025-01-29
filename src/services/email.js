const path = require('path')

const EmailTemplates = require('email-templates')
const { sendMail } = require('~/utils/mailer')
const { templateList } = require('~/emails')
const {
  gmailCredentials: { user }
} = require('~/configs/config')
console.log('User (from address):', user)

const { createError } = require('~/utils/errorsHelper')
const { TEMPLATE_NOT_FOUND } = require('~/consts/errors')

const emailTemplates = new EmailTemplates()

const emailService = {
  sendEmail: async (email, subject, language, text = {}) => {
    const templateToSend = templateList[subject]

    if (!templateToSend) {
      throw createError(404, TEMPLATE_NOT_FOUND)
    }

    const langTemplate = templateToSend[language]

    console.log('Path to template:', langTemplate.template)
    console.log('check')

    const templatePath = path.join(__dirname, '../emails', langTemplate.template)
    console.log('Resolved template path:', templatePath)

    const html = await emailTemplates.render(templatePath, text)

    console.log('html')
    console.log(html)

    await sendMail({
      from: `Space2Study <${user}>`,
      to: email,
      subject: langTemplate.subject,
      html: html
    })
  }
}
// Функция для подтверждения email
const confirmEmailService = async (token) => {
  if (!token) {
    throw new Error('Token is required')
  }

  // const user = await User.findOneAndUpdate(
  //   { confirmationToken: token }, // Ищем пользователя по токену
  //   { isEmailConfirmed: true }, // Обновляем статус
  //   { new: true } // Возвращаем обновленный документ
  // )

  // if (!user) {
  //   throw new Error('Invalid token or user not found')
  // }

  return {
    // email: user.email,
    status: 'confirmed',
    message: 'Email confirmed successfully!'
  }
}

// module.exports = emailService

// module.exports.confirmEmailService = confirmEmailService

module.exports = {
  emailService,
  confirmEmailService
}
