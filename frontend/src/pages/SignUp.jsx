import React, { useRef, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Image,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import signUpImg from '../assets/signUp.jpg';
import { signUpSchema } from '../utils/validation';
import { signUp } from '../store/entities/auth/authThunk';
import { routes } from '../utils/routes';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [signUpFailed, setSignUpFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema(
      t('signUp.usernameLength'),
      t('signUp.passwordMin'),
      t('signUp.mustMatch'),
      t('signUp.required'),
    ),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await dispatch(signUp(values));
        setSignUpFailed(false);
        navigate(routes.chat);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setSignUpFailed(true);
        } else {
          toast.error(t('networkError'));
        }
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image
                  src={signUpImg}
                  className="rounded-circle"
                  alt={t('signUp.registration')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="w-50"
              >
                <h1 className="text-center mb-4">{t('signUp.registration')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signUp.usernameLength')}
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={(formik.errors.username && formik.touched.username) || signUpFailed}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">
                    {t('signUp.username')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    name="password"
                    autoComplete="new-password"
                    required
                    placeholder={t('signUp.passwordMin')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password) || signUpFailed}
                  />
                  <Form.Label htmlFor="password">
                    {t('signUp.password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    placeholder={t('signUp.mustMatch')}
                    type="password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || signUpFailed
                    }
                  />
                  <Form.Label htmlFor="confirmPassword">
                    {t('signUp.confirmPassword')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {signUpFailed ? t('signUp.alreadyExists') : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('signUp.signUp')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
