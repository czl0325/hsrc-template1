module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: false,
      message: 'Project name',
      default: 'myProject'
    },
    author: {
      type: 'string',
      required: false,
      message: 'Author name'
    }
  }
}
