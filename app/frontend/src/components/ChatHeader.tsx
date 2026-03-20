import { useChatStore } from "../stores/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  return (
    <div className="p-4 border-b bg-gray-800 border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 flex justify-between items-center">
            <img
              className="w-full h-full rounded-full"
              src={selectedUser?.imageUrl}
              alt="image"
            />
            <div className="flex-1 min-w-0 ml-2  ">
              {selectedUser?.firstName}
              <p className="text-xs">
                {selectedUser?.clerkId && onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
