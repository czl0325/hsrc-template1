const path = require('path')
const fs = require('fs')

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
      default: 'myProject'
    }
  }
}
