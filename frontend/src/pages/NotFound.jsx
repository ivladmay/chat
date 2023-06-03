import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import notFoundImg from '../assets/notFound.svg';
import { routes } from '../utils/routes';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={notFoundImg} alt={t('notFound.notFound')} className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFound.notFound')}</h1>
      <p className="text-muted">
        {t('notFound.redirect')}
        <Link to={routes.chat}>{t('notFound.mainPage')}</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
