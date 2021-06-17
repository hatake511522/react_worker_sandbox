onmessage = function (e) {
  console.log("message received from main");
  var history = e.data[0];
  var watchStatus = e.data[1];
  if (watchStatus.isWatching) {
    navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      // setPosition({ latitude, longitude });
      history.push([latitude, longitude]);
      var formatted = moment(position.timestamp).format();
      historyTimestamp.push([formatted]);
      console.log(position);
    });
    postMessage(history);
  }
};
