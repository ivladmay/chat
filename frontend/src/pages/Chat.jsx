import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import fetchChannels from '../store/entities/channels/channelsThunk';
import Channels from '../components/channels/Channels';
import Messages from '../components/messages/Messages';
import getModal from '../components/modals/index';

const ChatPage = () => {
  const { auth } = useSelector((state) => state.auth);
  const { modals } = useSelector((state) => state.modals);

  const dispatch = useDispatch();

  const renderModal = () => {
    if (modals.type === '') {
      return null;
    }
    const Modal = getModal(modals.type);
    return <Modal />;
  };

  useEffect(() => {
    dispatch(fetchChannels(auth.token));
  }, [dispatch, auth.token]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      {renderModal()}
    </Container>
  );
};

export default ChatPage;
