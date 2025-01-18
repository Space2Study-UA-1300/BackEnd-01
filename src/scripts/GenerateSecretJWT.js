const fs = require('fs')
const crypto = require('crypto')

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex')
}

const inputFile = '.env.local'

const generatedSecrets = `JWT_ACCESS_SECRET=${generateSecret()}
JWT_REFRESH_SECRET=${generateSecret()}
JWT_CONFIRM_SECRET=${generateSecret()}
JWT_RESET_SECRET=${generateSecret()}
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=24h
JWT_RESET_EXPIRES_IN=24h
JWT_CONFIRM_EXPIRES_IN=24h
`

const linesToDelete = [
  'JWT_ACCESS_SECRET=',
  'JWT_REFRESH_SECRET=',
  'JWT_RESET_SECRET=',
  'JWT_CONFIRM_SECRET=',
  'JWT_ACCESS_EXPIRES_IN=1h',
  'JWT_REFRESH_EXPIRES_IN=24h',
  'JWT_RESET_EXPIRES_IN=24h',
  'JWT_CONFIRM_EXPIRES_IN=24h'
]

const deleteSecrets = () => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8')
    const updatedContent = data
      .split('\n')
      .filter((line) => !linesToDelete.some((item) => line.startsWith(item)))
      .join('\n')
    fs.writeFileSync(inputFile, updatedContent, 'utf8')
    console.log('Secrets deleted successfully.')
  } catch (err) {
    console.error('Error processing the file:', err)
  }
}

const writeSecret = (filePath, secrets) => {
  try {
    fs.appendFileSync(filePath, secrets, 'utf8')
    console.log('Secrets appended successfully.')
  } catch (err) {
    console.error('Error appending to the file:', err)
  }
}

deleteSecrets()
writeSecret(inputFile, generatedSecrets)
