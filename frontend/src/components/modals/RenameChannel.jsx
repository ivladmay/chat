import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { addChannelSchema } from '../../utils/validation';
import { useWebSocket } from '../../providers/WebSocketProvider';
import { useWordFilter } from '../../providers/WordFilterProvider';
import { closeModal } from '../../store/entities/modals/modalsSlice';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannelApi } = useWebSocket();
  const filter = useWordFilter();
  const inputRef = useRef(null);

  const { modals } = useSelector((state) => state.modals);
  const { channels } = useSelector((state) => state.channels);
  const currentChannel = channels.find((el) => el.id === modals.target);
  const channelList = channels.map((el) => el.name);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: addChannelSchema(channelList, t('modals.uniqueName'), t('modals.lengthParams'), t('modals.required')),
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const { name } = values;
        await renameChannelApi({ id: modals.target, name: filter.clean(name) });
        handleClose();
        toast.success(t('channels.renamed'));
      } catch (error) {
        setSubmitting(false);
        toast.error(t('channels.renamingError'));
      }
    },
  });

  return (
    <Modal show={modals.isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            id="name"
            name="name"
            className="mb-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={formik.errors.name}
            ref={inputRef}
          />
          <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button onClick={handleClose} className="me-2" variant="secondary">
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
