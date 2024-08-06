const sendMessage = async (socket, data) => {
  try {
    const { message } = data;
    socket.emit('chat message', message);
  } catch (error) {
    console.log(error);
  }
};

export const chatController = {
  sendMessage
};
