import { Socket } from 'socket.io';

function onConnect(socket: Socket) {
  console.log('Connection a user a');
  socket.on('disconnect', () => {
    console.log('Disconnect a user');
  });
  socket.on('test', (...args) => {
    console.log(args);
  });
}

export default onConnect;
