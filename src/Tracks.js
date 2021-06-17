import React, { useRef, setState, useEffect, useState } from "react";
var moment = require("moment");
// const min_duration = 2000; //ms

const Tracks = () => {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [watchStatus, setWatchsStatus] = useState({
    isWatcing: false,
    watchId: null,
  });
  const [history] = useState([]);
  const [historyTimestamp] = useState([]);

  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  //監視開始
  const startWatchPosition = () => {
    // var myWorker = new Worker(process.env.PUBLIC_URL + "/track.worker.js");
    // myWorker.postMessage([history, watchStatus]);
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
      history.push([latitude, longitude]);
      var formatted = moment(position.timestamp).format();
      historyTimestamp.push([formatted]);
      console.log(`position.timestamp:` + position.timestamp);
      console.log(`timestamp:` + formatted);
      console.log(history);
    });
    myWorker.onmessage = function (e) {
      history = e.data;
      console.log("message received from worker");
    };
    setWatchsStatus({ isWatcing: true, watchId });
  };

  //監視停止
  const stopWatchPosition = () => {
    navigator.geolocation.clearWatch(watchId);
    setWatchsStatus({ isWatcing: false, watchId });
    history = [];
  };

  if (isFirstRef.current) return <div>Loading...</div>;

  const { isWatcing, watchId } = watchStatus;
  let historyLength = history.length;

  return (
    <div>
      {isWatcing ? (
        <button onClick={() => stopWatchPosition(watchStatus)}>
          stop watch position
        </button>
      ) : (
        <button onClick={startWatchPosition}>start watch position</button>
      )}
      <div>
        <h3>position</h3>
        <div>
          latitude: {position.latitude}
          <br />
          longitude: {position.longitude}
        </div>
        <h3>history</h3>
        <div>
          <p>{history}</p>
          <h3>timestamp</h3>
          <p>{historyTimestamp}</p>
          <p>{historyLength}</p>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
