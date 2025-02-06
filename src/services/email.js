const path = require('path')

const EmailTemplates = require('email-templates')
const { sendMail } = require('~/utils/mailer')
const { templateList } = require('~/emails')
const {
  gmailCredentials: { user }
} = require('~/configs/config')
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
    const templatePath = path.join(__dirname, '../emails', langTemplate.template)
    const html = await emailTemplates.render(templatePath, text)
    await sendMail({
      from: `Space2Study <${user}>`,
      to: email,
      subject: langTemplate.subject,
      html
    })
  }
}

module.exports = emailService
