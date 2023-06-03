import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { closeModal } from '../../store/entities/modals/modalsSlice';
import { addChannelSchema } from '../../utils/validation';
import { useWebSocket } from '../../providers/WebSocketProvider';
import { useWordFilter } from '../../providers/WordFilterProvider';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addChannelApi } = useWebSocket();
  const filter = useWordFilter();
  const inputRef = useRef(null);

  const { channels } = useSelector((state) => state.channels);
  const { modals } = useSelector((state) => state.modals);
  const channelList = channels.map((el) => el.name);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClose = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelSchema(channelList, t('modals.uniqueName'), t('modals.lengthParams'), t('modals.required')),
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const { name } = values;
        await addChannelApi({ name: filter.clean(name) });
        handleClose();
        toast.success(t('channels.created'));
      } catch (error) {
        setSubmitting(false);
        toast.error(t('channels.creationError'));
      }
    },
  });

  return (
    <Modal show={modals.isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
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

export default AddChannel;
