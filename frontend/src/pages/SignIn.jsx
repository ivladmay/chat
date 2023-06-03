import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { signIn } from '../store/entities/auth/authThunk';
import { routes } from '../utils/routes';
import { signInSchema } from '../utils/validation';
import signInImg from '../assets/signIn.jpg';

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signInSchema(t('signIn.required')),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await dispatch(signIn(values));
        setAuthFailed(false);
        navigate(routes.chat);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
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
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={signInImg}
                  className="rounded-circle"
                  alt={t('signIn.enter')}
                />
              </Col>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('signIn.enter')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signIn.nickname')}
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">
                    {t('signIn.nickname')}
                  </Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('signIn.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">
                    {t('signIn.password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('signIn.wrongData')}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('signIn.enter')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signIn.noAccount')}</span>
                <Link to={routes.signUp}>{t('signIn.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
