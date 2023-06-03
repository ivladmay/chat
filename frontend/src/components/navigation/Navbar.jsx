import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '../../utils/routes';
import { logOut } from '../../store/entities/auth/authSlice';

const MyNavbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate(routes.signIn);
  };

  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand as={Link} to={routes.chat}>{t('hexlet')}</Navbar.Brand>
        { auth && (
        <Button variant="primary" onClick={handleLogOut}>
            {t('logOut')}
        </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
