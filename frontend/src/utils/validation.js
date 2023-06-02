import * as yup from 'yup';

const signInSchema = (message) => yup.object().shape({
  username: yup.string().trim().required(message),
  password: yup.string().trim().required(message),
});

export default signInSchema;
