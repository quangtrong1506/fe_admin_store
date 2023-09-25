import { io } from 'socket.io-client';

const socket = (namespace) => {
    if (!namespace) {
        return io(process.env.REACT_APP_SOCKET_IO_SERVER);
    }
    return io(process.env.REACT_APP_SOCKET_IO_SERVER + namespace);
};

export default socket;
