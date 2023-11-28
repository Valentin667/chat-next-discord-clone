import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const Commands = () => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    setSounds({
      discord_notification_sound_effect: new Audio(
        "/assets/sounds/discord_notification_sound_effect.mp3"
      ),
    });
  }, []);

  useEffect(() => {
    const onCommand = (command) => {
      switch (command) {
        case "/discordjoin":
          sounds.discord_notification_sound_effect.currentTime = 0;
          sounds.discord_notification_sound_effect.play();
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
