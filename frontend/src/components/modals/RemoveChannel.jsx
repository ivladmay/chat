import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { closeModal } from '../../store/entities/modals/modalsSlice';
import { useWebSocket } from '../../providers/WebSocketProvider';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannelApi } = useWebSocket();

  const { modals } = useSelector((state) => state.modals);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    try {
      await removeChannelApi({ id: modals.target });
      dispatch(closeModal());
      toast.success(t('channels.removed'));
    } catch (error) {
      toast.error(t('channels.removingError'));
    }
  };

  return (
    <Modal show={modals.isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleClose} className="me-2" variant="secondary">
            {t('modals.cancel')}
          </Button>
          <Button onClick={handleRemove} type="submit" variant="danger">
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
