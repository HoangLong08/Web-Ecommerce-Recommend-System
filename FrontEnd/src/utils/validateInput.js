function validateInput(valueField, nameField, numberChar, regex) {
  if (valueField.length === 0) {
    return {
      isValid: false,
      nameField: nameField,
      message: `Vui lòng nhập thông tin ${nameField}`,
    };
  } else if (numberChar > 0) {
    if (valueField.length <= numberChar) {
      return {
        isValid: false,
        nameField: nameField,
        message: `Vui lòng nhập tối thiểu ${numberChar} ký tự`,
      };
    }
  } else if (regex) {
    if (!regex.test(valueField)) {
      return {
        isValid: false,
        nameField: nameField,
        message: `${nameField} không hợp lệ`,
      };
    }
  }
  return {
    isValid: true,
    nameField: nameField,
    message: "",
  };
}

export { validateInput };
