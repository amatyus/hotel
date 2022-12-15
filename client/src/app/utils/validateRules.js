export function validator(data, config) {
  const errors = {}

  function validate(validadteMethod, data, config) {
    let statusValidate

    switch (validadteMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data
        } else {
          statusValidate = data.trim() === ''
        }

        break
      }

      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(data)
        break
      }

      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g
        statusValidate = !capitalRegExp.test(data)
        break
      }

      case 'isContainDigit': {
        const containRegExp = /\d+/g
        statusValidate = !containRegExp.test(data)
        break
      }

      case 'min': {
        statusValidate = data.length < config.value
        break
      }

      default:
        break
    }

    if (statusValidate) {
      return config.message
    }
  }

  for (const fildName in data) {
    for (const validadteMethod in config[fildName]) {
      const error = validate(
        validadteMethod,
        data[fildName],
        config[fildName][validadteMethod]
      )
      if (error && !errors[fildName]) {
        errors[fildName] = error
      }
    }
  }

  return errors
}
