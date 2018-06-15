
// Init client
socket = io.connect( 'http://localhost:5000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 99999
} );

socket.on( 'connect', function () {
  console.log( 'connected to server' );
} );

socket.on( 'disconnect', function () {
  console.log( 'disconnected to server' );
} );

socket.on( 'hello', function (data) {
  console.log( data );
} );