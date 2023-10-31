import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const Commands = () => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    setSounds({
      golmon: new Audio("/assets/golmon.mp3"),
      chef: new Audio("/assets/chef.mp3"),
    });
  }, []);

  useEffect(() => {
    const onCommand = (command) => {
      switch (command) {
        case "/chef":
          sounds.chef.currentTime = 0;
          sounds.chef.play();
          break;

          case "/golmon":
          sounds.golmon.currentTime = 0;
          sounds.golmon.play();
          break;

        default:
          break;
      }
    };

    socket.on("command", onCommand);

    return () => {
      socket.off("command", onCommand);
    };
  }, [sounds]);

  return <div></div>;
};

export default Commands;