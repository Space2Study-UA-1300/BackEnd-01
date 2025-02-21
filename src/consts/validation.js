const lengths = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 25,
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 30
}

const regex = {
  EMAIL_PATTERN: /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i,
  PASSWORD_PATTERN: /^(?=.*\d)(?=.*[a-zа-яєії])\S+$/i,
  NAME_PATTERN: /^[a-zа-яєії]+$/i
}

const enums = {
  APP_LANG_ENUM: ['en', 'ua'],
  SPOKEN_LANG_ENUM: [
    'Chinese', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish',
    'French', 'German', 'Hungarian', 'Icelandic', 'Italian', 'Japanese',
    'Korean', 'Norwegian', 'Polish', 'Portuguese (Brazil)', 'Portuguese (Portugal)',
    'Romanian', 'Slovak', 'Spanish', 'Swedish', 'Ukrainian'
  ],
  PROFICIENCY_LEVEL_ENUM: ['Beginner', 'Intermediate', 'Advanced', 'Test Preparation', 'Professional', 'Specialized'],
  ROLE_ENUM: ['student', 'tutor', 'admin', 'superadmin'],
  LOGIN_ROLE_ENUM: ['student', 'tutor', 'admin'],
  MAIN_ROLE_ENUM: ['student', 'tutor'],
  STATUS_ENUM: ['active', 'blocked'],
  QUESTION_TYPE_ENUM: ['multipleChoice', 'openAnswer', 'oneAnswer'],
  QUIZ_VIEW_ENUM: ['Stepper', 'Scroll'],
  RESOURCES_TYPES_ENUM: ['lessons', 'attachments', 'questions', 'quizzes'],
  OFFER_STATUS_ENUM: ['active', 'draft', 'closed'],
  CATEGORY_ICONS_ENUM: [
    'audiotrack',
    'biotech',
    'brush',
    'language',
    'monitor',
    'palette',
    'payments',
    'science',
    'star',
    'tag',
    'troubleshoot'
  ]
}

module.exports = {
  lengths,
  regex,
  enums
}
