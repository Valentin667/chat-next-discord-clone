"use client";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";
import Input from "@/components/input/input";
import Commands from "@/components/commands/Commands";
import style from "@/styles/index.module.scss";
import Notification from "@/components/notification/Notification";
import UserList from "@/components/userList/UserList";
import Message from "@/components/message/Message";
import ChatHeader from "@/components/chatheader/ChatHeader";
import Sidebar from "@/components/sidebar/Sidebar";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();
  const viewerRef = useRef();
  const { push } = useRouter();

  const onSession = ({ sessionID, userID }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;

    localStorage.removeItem("error");
  };

  const onMessage = (message) => {
    console.log("message received", message);
    setMessages((oldMessages) => [...oldMessages, message]);
  };

  const getMessagesAtInit = (messagesAtInit) => {
    setMessages(messagesAtInit);
  };

  const onUserConnect = (_user) => {
    const existingUser = users.find((user) => user.userID === _user.userID);

    if (existingUser) {
      return;
    }

    setUsers((currentUsers) => [...currentUsers, _user]);
  };

  const onUserDisconnect = (_userID) => {
    const filteredArray = [...users].filter((_user) =>
      _user.userID !== _userID ? true : false
    );
    console.log(filteredArray);
    setUsers(filteredArray);
  };

  const onConnectionError = (err) => {
    console.log("err", err);
    localStorage.removeItem("username");
    localStorage.removeItem("sessionID");
    localStorage.setItem("error", 200);
    push("/login");
  };

  const getUserAtInit = (_users) => {
    console.log(_users);
    setUsers(_users);
  };

  const scrollToBottom = () => {
    console.log("scroll top", viewerRef.current.scrollTop);

    viewerRef.current.scrollTop = viewerRef.current.scrollHeight;
  };

  const onError = ({ code, error }) => {
    console.log(code, error);

    let title = "";
    let content = "";

    switch (code) {
      case 100:
        title = `Erreur ${code} : Spam`;
        content = `tu spam trop chacal`;
        break;

      default:
        break;
    }

    setError({
      title,
      content,
    });
  };

  const onPrivateMessage = ({ content, from, to, username }) => {
    console.log(content, from, to, username);
    // check from which user the message came from
    const userMessagingIndex = users.findIndex(
      (_user) => _user.userID === from
    );

    console.log(userMessagingIndex);

    const userMessaging = users.find((_user) => _user.userID === from);

    console.log(userMessaging);

    if (!userMessaging) return;

    userMessaging.messages.push({
      content,
      from,
      to,
      username: username,
    });

    if (userMessaging.userID !== selectedUser?.userID) {
      userMessaging.hasNewMessages = true;
    }

    const _users = [...users];
    _users[userMessagingIndex] = userMessaging;

    setUsers(_users);
  };

  useEffect(() => {
    socket.on("private message", onPrivateMessage);
    socket.on("user connected", onUserConnect);
    socket.on("user disconnected", onUserDisconnect);

    return () => {
      socket.off("private message", onPrivateMessage);
      socket.off("user connected", onUserConnect);
      socket.off("user disconnected", onUserDisconnect);
    };
  }, [users]);

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    // session is already defined
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
      // first time connecting and has already visited login page
    } else if (localStorage.getItem("username")) {
      const username = localStorage.getItem("username");
      socket.auth = { username };
      socket.connect();
      //   // redirect to login page
    } else {
      push("/login");
    }

    socket.on("error", onError);
    socket.on("session", onSession);
    socket.on("message", onMessage);
    socket.on("messages", getMessagesAtInit);
    socket.on("users", getUserAtInit);
    socket.on("disconnect", onConnectionError);
    socket.on("connect_error", onConnectionError);

    return () => {
      socket.disconnect();
      socket.off("error", onError);
      socket.off("session", onSession);
      socket.off("message", onMessage);
      socket.off("messages", getMessagesAtInit);
      socket.off("users", getUserAtInit);
      socket.off("disconnect", onConnectionError);
      socket.off("connect_error", onConnectionError);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  return (
    <div className={style.wrapper}>
      <Sidebar />
      <UserList
        users={users}
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        className={style.userlist}
      />
      {error && (
        <Notification
          title={error.title}
          content={error.content}
          onClose={() => setError(null)}
        />
      )}
      <div className={style.chat}>
        <ChatHeader />
        <Commands />
        <div ref={viewerRef} className={style.messages}>
          {selectedUser
            ? selectedUser.messages.map((message, key) => {
                return (
                  <Message
                    key={key}
                    username={message.username}
                    content={message.content}
                    fromSelf={message.from === socket.userID}
                  />
                );
              })
            : messages.map((message, key) => {
                return (
                  <Message
                    key={key}
                    username={message.username}
                    content={message.content}
                    fromSelf={message.from === socket.userID}
                  />
                );
              })}
        </div>
        <Input selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
