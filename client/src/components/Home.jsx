import useWebSocket from "react-use-websocket";
import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";

const renderCursors = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const Home = ({ username, onLogout }) => {
  const WS_URL = import.meta.env.VITE_WS_URL;
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const sendThrottledJsonMessage = useRef(throttle(sendJsonMessage, 50));

  useEffect(() => {
    // ask server to send everyone's cursor positions
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener("mousemove", (e) => {
      sendThrottledJsonMessage.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, [sendThrottledJsonMessage, sendJsonMessage]);

  if (lastJsonMessage) {
    return <>{renderCursors(lastJsonMessage)}</>;
  }

  return (
    <>
      <div className="home-container">
        <h1>{username}, Welcome to the Home Page!</h1>
        <p>
          <button onClick={() => onLogout("")}>Logout</button>
        </p>
      </div>
    </>
  );
};

export default Home;
