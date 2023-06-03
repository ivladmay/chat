import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import MyNavbar from './components/navigation/Navbar';
import { routes } from './utils/routes';
import { addMessage } from './store/entities/messages/messagesSlice';
import {
  addChannel,
  switchChannel,
  removeChannel,
  renameChannel,
} from './store/entities/channels/channelsSlice';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  const handleNewMessage = (message) => {
    dispatch(addMessage(message));
  };
  const handleNewChannel = (channel) => {
    dispatch(addChannel(channel));
    dispatch(switchChannel(channel.id));
  };
  const handleRemoveChannel = (channel) => {
    dispatch(removeChannel(channel));
  };
  const handleRenameChannel = (channel) => {
    dispatch(renameChannel(channel));
  };

  useEffect(() => {
    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path={routes.chat} element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path={routes.signUp} element={<SignUp />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
