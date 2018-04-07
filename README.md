# Tweet Streamer

Simple Node script to watch topics on twitter and stream to client via socket.io.

Something like this on client.

`socket.on('tweet', (tweet) => {
  console.log(tweet)
});`

To start:

` yarn start`

Can watch as many different topics as you like, need to supply your own access tokens.