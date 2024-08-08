import { useEffect, useState } from "react";
import { IconBrandWechat } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChatSideBar from "../features/chat/ChatSideBar";
import ChatRoom from "../features/chat/ChatRoom";
import useGetChats from "../features/chat/useGetChats";
import Lottie from "react-lottie";
import DataLoader from "./../ui/DataLoader";
import useGetChat from "../features/chat/useGetChat";
import "../Assets/styles/Chat.css";

const Chats = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../Assets/lotties/chat.json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const targetRoom = useSelector((state) => state.requestRoom.requestRoom);
  const { t } = useTranslation();
  const [showChatsMenu, setShowChatsMenu] = useState(false);
  const [targetChat, setTargetChat] = useState(null);
  const { data: chats, isLoading } = useGetChats();

  const { data: chat, isLoading: isChatLoading } = useGetChat({
    request_type: targetChat?.request_type,
    owner_id: targetChat?.owner_id,
    applied_id: targetChat?.applied_id,
    request_id: targetChat?.request_id
  });

  useEffect(() => {
    if (targetRoom?.owner_id) {
      setTargetChat(targetRoom);
    } else {
      setTargetChat(null);
    }
  }, [targetRoom]);

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="chat-section">
      <div className="container d-block">
        <button className="openTaps" onClick={() => setShowChatsMenu(true)}>
          <IconBrandWechat stroke={2} />
          <span> {t("chat.chats")} </span>
        </button>
        <div className="row">
          <div className="col-lg-4 col-12 p-2">
            <ChatSideBar
              chats={chats}
              setTargetChat={setTargetChat}
              targetChat={targetChat}
              showChatsMenu={showChatsMenu}
              setShowChatsMenu={setShowChatsMenu}
            />
          </div>
          <div className="col-lg-8 col-12 p-2">
            {targetChat ? (
              <>{isChatLoading ? <DataLoader /> : <ChatRoom chat={chat} />}</>
            ) : (
              <div className="lottie_player_holder">
                <Lottie options={defaultOptions} height={250} width={250} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chats;
