import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "../../stores/useChatStore";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserListLeft from "../../components/UserListLeft";
import ChatHeader from "../../components/ChatHeader";
import ChatBody from "../../components/ChatBody";
import ChatInput from "../../components/ChatInput";

const ChatPage = () => {
  const { user } = useUser();

  const { selectedUser, fetchUsers, fetchMessages } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [fetchMessages, selectedUser]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Navbar />

      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserListLeft />
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              <ChatBody />

              <ChatInput />

            </>

          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <img src="/logo.png" alt="Spotify" className="size-16" />
              <div className="text-center">
                <h3 className="text-zinc-300 text-lg font-medium mb-1">
                  No conversation selected
                </h3>
                <p className="text-zinc-500 text-sm">
                  Choose a friend to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default ChatPage;
