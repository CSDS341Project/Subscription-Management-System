import openSocket from 'socket.io-client';

const ws = openSocket('ws://18.220.211.136:5000');

export default ws;