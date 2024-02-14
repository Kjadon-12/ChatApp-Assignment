import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Chat.module.css";
import socketIO from "socket.io-client";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
const ENDPOINT = "http://localhost:8082";
let socket;

const Chat = () => {
  const location = useLocation();
  const userName = location.state && location.state.userName;
  let date = new Date();
  let currDate = date.toLocaleDateString();
  let time = date.toLocaleTimeString();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const emojiList = ["😊", "❤️", "👍", "🎉", "🔥"];
  const send = () => {
    socket.emit("message", { message, id });

    setMessage("");
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // console.log("frontend socket connected");
      // alert("chat connected")
      setid(socket.id);
    });
    socket.emit("joined", { userName });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div>
      <div className={styles.chatWrapper}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <h4>{currDate} </h4>
            <h4>{time}</h4>
          </div>
          <ReactScrollToBottom className={styles.chatBox}>
            {messages.map((item, i) => (
              <Message
                key={i}
                user={item.id === id ? "" : item.user}
                message={item.message}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>

          <div className={styles.chatInput}>
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊
            </button>

            <input
              onKeyDown={(event) => (event.key === "Enter" ? send() : null)}
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button onClick={send} className={styles.sendBtn}>
              Send
            </button>
          </div>
          {showEmojiPicker && (
            <div className={styles.emojiPicker}>
              {emojiList.map((emoji, index) => (
                <span key={index} onClick={() => handleEmojiClick(emoji)}>
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
