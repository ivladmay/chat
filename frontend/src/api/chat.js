const chatApi = (socket) => {
  const renameChannelApi = (channel) => socket.emit('renameChannel', channel);

  const removeChannelApi = (channel) => socket.emit('removeChannel', channel);

  const addMessageApi = (message) => socket.emit('newMessage', message);

  const addChannelApi = (channel) => socket.emit('newChannel', channel);

  return {
    addMessageApi,
    addChannelApi,
    removeChannelApi,
    renameChannelApi,
  };
};

export default chatApi;
