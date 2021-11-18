import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { userCred } from "../Router";
let endpoint = "http://localhost:5000";
let socket = io.connect(`${endpoint}`);

function Chat() {
  const [message, setMessage] = useState("");
  const [incMsg, setIncMsg] = useState([""]);
  const [showChat, setShowChat] = useState(false);

  const { userName } = useContext(userCred);

  const getMessages = () => {
    socket.on("message", (msg) => {
      setIncMsg([...incMsg, msg]);
    });
  };

  useEffect(() => {
    getMessages();
  }, [incMsg.length]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = (e) => {
    if (!message.trim()) {
      console.log("error");
    } else {
      socket.emit("message", userName + " : " + message);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "0px",
        zIndex: "10",
      }}
    >
      {showChat && (
        <div>
          <div
            style={{
              height: "100px",
              width: "230px",
              border: "1px solid white",
              overflow: "scroll",
              background: "black",
            }}
          >
            {incMsg.length > 0 &&
              incMsg.map((msg) => (
                <div>
                  <p style={{ color: "white" }}> {msg} </p>
                </div>
              ))}
          </div>
          <input
            value={message}
            name="message"
            onChange={(e) => onChange(e)}
            onKeyPress={(e) => {
              console.log(e.key);
              e.key === "Enter" ? onClick() : null;
            }}
          ></input>
          <button onClick={() => onClick()}>send!</button>
        </div>
      )}

      <button
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: "10",
        }}
        onClick={() => setShowChat(!showChat)}
      >
        Group Chat
      </button>
    </div>
  );
}

export default Chat;
