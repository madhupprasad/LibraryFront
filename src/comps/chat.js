import React, { useContext, useEffect, useState } from "react";
import { userCred } from "../Router";

function Chat({ socket }) {
  const [message, setMessage] = useState("");
  const [incMsg, setIncMsg] = useState(["Welcome Everyone! - Group chat"]);
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
        bottom: "100px",
        right: "0px",
        zIndex: "10",
      }}
    >
      {showChat && (
        <div>
          <div
            style={{
              height: "320px",
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
          bottom: "10px",
          right: "10px",
          zIndex: "10",
          cursor: "pointer",
          padding: "10px",
          borderRadius: "50%",
          border: "none",
        }}
        onClick={() => setShowChat(!showChat)}
      >
        <img src="https://img.icons8.com/ios-filled/50/000000/chat--v1.png" />
      </button>
    </div>
  );
}

export default Chat;
