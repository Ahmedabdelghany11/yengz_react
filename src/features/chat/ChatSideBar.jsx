import React from "react";
import avatar from "../../Assets/images/avatar.jpg";
import deletedAccount from "../../Assets/images/deleted-account.jpg";
import { IconPaperclip, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatMessageTime } from "../../utils/helpers";

const ChatSideBar = ({
  setShowChatsMenu,
  showChatsMenu,
  chats,
  targetChat,
  setTargetChat
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);

  function truncate(inputString) {
    let truncateStringResult;
    if (inputString.length > 35) {
      truncateStringResult = inputString.substring(0, 35) + "...";
    } else {
      truncateStringResult = inputString;
    }
    return truncateStringResult;
  }

  return (
    <div className={`side-menu ${showChatsMenu ? "active" : ""}`}>
      <div className="colse" onClick={() => setShowChatsMenu(false)}>
        <IconX stroke={2} />
      </div>
      {chats?.map((chat) => (
        <button
          className={`nav-link ${targetChat?.id === chat?.id ? "active" : ""}`}
          key={chat?.id}
          onClick={() => {
            setTargetChat(chat);
            setShowChatsMenu(false);
          }}
        >
          <img
            className="userImg"
            src={
              chat?.apply
                ? chat?.apply?.id === user?.id
                  ? chat?.owner?.image
                  : chat?.apply?.image || avatar
                : deletedAccount
            }
            alt="user"
          />
          <div className="text-wrap">
            <h6 className="name">
              {chat?.apply
                ? chat?.apply?.id === user?.id
                  ? chat?.owner?.name
                  : chat?.apply?.name
                : t("chat.deletedAccount")}
            </h6>
            <p className="lastMessage unread">
              {chat?.last_message?.type !== "text" ? (
                <div className="icon">
                  <IconPaperclip stroke={2} />
                  <span>{t("chat.attachment")}</span>
                </div>
              ) : (
                truncate(chat?.last_message?.message)
              )}
              {chat?.last_message?.from_id === user?.id && (
                <span className="read">
                  {(chat?.apply?.id === user?.id &&
                    chat?.last_message?.is_read_owner === 1) ||
                  (chat?.apply?.id !== user?.id &&
                    chat?.last_message?.is_read_apply === 1) ? (
                    <i class="fa-regular fa-check-double"></i>
                  ) : (
                    <i className="fa-regular fa-check"></i>
                  )}
                </span>
              )}
            </p>
            <span className="time" dir="ltr">
              {formatMessageTime(chat?.last_message?.created_at)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatSideBar;
