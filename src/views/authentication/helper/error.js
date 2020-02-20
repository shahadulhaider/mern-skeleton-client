export const getErrorText = (errors, name) => {
  if (!errors[name]) return "";

  if (errors[name].type) {
    switch (errors[name].type) {
      case "required":
        return errors[name].message;
      case "pattern": {
        return errors[name].message;
      }
      case "minLength": {
        if (name === "username")
          return "Username should be at least 4 characters";
        else if (name === "password")
          return "Password should be atleast 8 characters";
        else return errors[name].message;
      }
      case "maxLength": {
        if (name === "username")
          return "Username should not be more than 30 characters";
        else if (name === "password")
          return "Password should not be more than 30 characters";
        else return errors[name].message;
      }
      default:
        return errors[name].message;
    }
  }
};
