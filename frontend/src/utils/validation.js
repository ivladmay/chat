import * as yup from 'yup';

export const signInSchema = (message) => yup.object().shape({
  username: yup.string().trim().required(message),
  password: yup.string().trim().required(message),
});

export const signUpSchema = (lengthParams, passwordMin, mustMatch, requiredField) => yup
  .object().shape({
    username: yup.string().trim()
      .min(3, lengthParams)
      .max(20, lengthParams)
      .required(requiredField),
    password: yup.string().trim()
      .min(6, passwordMin)
      .required(requiredField),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], mustMatch)
      .required(requiredField),
  });
