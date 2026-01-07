"use client"
import { Sidebar } from "../app/components/layout/Sidebar";
import { FriendLabel, FriendLabelLoading } from "../app/components/chat/FriendLabel";
import { MessageBubble } from "../app/components/chat/MessageBubble";
import { ChatHeader } from "../app/components/chat/ChatHeader";
import { ChatInput } from "../app/components/chat/ChatInput";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useI18n } from "./lib/i18nContext";
import Chat, { testMessages } from "./components/chat/Chat/Chat";
import "flag-icons/css/flag-icons.min.css";

export type MessagePosition = "single" | "first" | "middle" | "last"

export interface Message {
  id: string
  content: string
  senderId: string,
  time: string
}

export function getMessagePosition(
  messages: Message[],
  index: number
): MessagePosition {
  const current = messages[index]
  const prev = messages[index - 1]
  const next = messages[index + 1]

  const samePrev = prev && prev.senderId === current.senderId
  const sameNext = next && next.senderId === current.senderId

  if (!samePrev && !sameNext) return "single"
  if (!samePrev && sameNext) return "first"
  if (samePrev && sameNext) return "middle"
  return "last"
}

export default function Home() {
  const users = [
    { name: "Hồ Đông Huy", lastMes: "Ok không có gì nha bạn", time: "1 phút", read: false, },
    { name: "Nguyễn Văn An", lastMes: "Ê mà cái bài tập hôm quá nó khó vãi luôn á bạn làm được không", time: "10 phút", read: false },
    { avatar: "/otisadminbg.jpeg", name: "Lê Văn An", lastMes: "Hihi", time: "1 giờ", read: true, active: true },
    { name: "Hồ Đông Huy", lastMes: "Ok không có gì nha bạn", time: "1 phút", read: false },
    { name: "Nguyễn Văn An", lastMes: "Ê mà cái bài tập hôm quá nó khó vãi luôn á bạn làm được không", time: "10 phút", read: false },
    { avatar: "/otisadminbg.jpeg", name: "Lê Văn An", lastMes: "Hihi", time: "1 giờ", read: true },
    { name: "Hồ Đông Huy", lastMes: "Ok không có gì nha bạn", time: "1 phút", read: false },
    { name: "Nguyễn Văn An", lastMes: "Ê mà cái bài tập hôm quá nó khó vãi luôn á bạn làm được không", time: "10 phút", read: false },
    { avatar: "/otisadminbg.jpeg", name: "Lê Văn An", lastMes: "Hihi", time: "1 giờ", read: true },
    { name: "Hồ Đông Huy", lastMes: "Ok không có gì nha bạn", time: "1 phút", read: false },
    { name: "Nguyễn Văn An", lastMes: "Ê mà cái bài tập hôm quá nó khó vãi luôn á bạn làm được không", time: "10 phút", read: false },
    { avatar: "/otisadminbg.jpeg", name: "Lê Văn An", lastMes: "Hihi", time: "1 giờ", read: true },
    { name: "Hồ Đông Huy", lastMes: "Ok không có gì nha bạn", time: "1 phút", read: false },
    { name: "Nguyễn Văn An", lastMes: "Ê mà cái bài tập hôm quá nó khó vãi luôn á bạn làm được không", time: "10 phút", read: false },
    { avatar: "/otisadminbg.jpeg", name: "Lê Văn An", lastMes: "Hihi", time: "1 giờ", read: true }
  ]

  const myId = "me"

  const messages: Message[] = [
    { id: "1", content: "Ê mày", senderId: "me", time: "12:09" },
    { id: "2", content: "Gì vậy", senderId: "me", time: "12:09" },
    { id: "3", content: "Tối nay rảnh không", senderId: "me", time: "12:09" },

    { id: "4", content: "Rảnh", senderId: "u1", time: "12:09" },
    { id: "5", content: "Có gì không", senderId: "u1", time: "12:09" },

    { id: "6", content: "Đi cà phê", senderId: "me", time: "12:09" },
    { id: "7", content: "Tối nay ra đánh game, chơi lên chiến thần 100 sao luôn quá đã hahaha", senderId: "me", time: "12:09" },
    { id: "8", content: "Ê mày", senderId: "me", time: "12:09" },
    { id: "9", content: "Gì vậy", senderId: "me", time: "12:09" },
    { id: "10", content: "Tối nay rảnh không", senderId: "me", time: "12:09" },

    { id: "11", content: "Rảnh", senderId: "u1", time: "12:09" },
    { id: "12", content: "Có gì không", senderId: "u1", time: "12:09" },

    { id: "13", content: "Đi cà phê", senderId: "me", time: "12:09" },
    { id: "14", content: "Tối nay ra đánh game, chơi lên chiến thần 100 sao luôn quá đã hahaha", senderId: "me", time: "12:09" },
    { id: "15", content: "Ê mày", senderId: "me", time: "12:09" },
    { id: "16", content: "Gì vậy", senderId: "me", time: "12:09" },
    { id: "17", content: "Tối nay rảnh không", senderId: "me", time: "12:09" },

    { id: "18", content: "Rảnh", senderId: "u1", time: "12:09" },
    { id: "19", content: "Có gì không", senderId: "u1", time: "12:09" },

    { id: "20", content: "Đi cà phê", senderId: "me", time: "12:09" },
    { id: "21", content: "Tối nay ra đánh game, chơi lên chiến thần 100 sao luôn quá đã hahaha", senderId: "me", time: "12:09" }
  ]

  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])

  return (
    <div className="flex h-full overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      <aside className="hidden sm:flex flex-col w-85 bg-background border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-2">{t('chat.chat')}</h2>
        <ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {
            loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <FriendLabelLoading key={i} />
              ))
            ) : (
              users.map((user, index) => (
                <FriendLabel
                  key={index}
                  avatar={user.avatar}
                  name={user.name}
                  lastMes={user.lastMes}
                  time={user.time}
                  read={user.read}
                  active={user.active}
                />
              ))
            )
          }

          {/* {users.map((user) => (
            <li
              key={user}
              className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {user}
            </li>
          ))} */}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col justify-between">

        <div className="shrink-0 border-b border-gray-200 dark:border-gray-700">
          <ChatHeader
          />
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex flex-col max-w-4xl mx-auto w-full">
              {/* {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id}
                  content={msg.content}
                  isMe={msg.senderId === myId}
                  position={getMessagePosition(messages, index)}
                  time={msg.time}
                />
              ))} */}

              <Chat messages={testMessages} currentUserId="me" />
            </div>
          )}

        </div>

        {/* Input box */}
        <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">

          <ChatInput />
          {/* <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>
      </main >
    </div >
  );
}