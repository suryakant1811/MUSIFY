import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "../stores/useChatStore";


const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US",{
    hour:"2-digit",
  minute:"2-digit",
  hour12: true,
  });
  
}

const ChatBody = () => {

  const { user } = useUser();
  const { messages, selectedUser } = useChatStore();

  return (
    <div className="card   shadow-lg no-scrollbar  h-[calc(100vh-350px)]  overflow-y-scroll">
      {messages.map((item) => (
        <div
          key={item._id}
          className={`flex items-start mr-[2%] ${
            item.senderId === user?.id ? "flex-row-reverse" : ""
          }`}
        >
          <div className="relative ">
            <div className="w-auto h-12 mb-16 flex justify-between items-center">
              <img
                className="w-12 h-12 rounded-full"
                src={
                  item.senderId === user?.id
                    ? user.imageUrl
                    : selectedUser?.imageUrl
                }
                alt="image"
              />

              <div
                className={`rounded-lg p-3 
             ${item.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"}
            `}
              >
                <p className="text-sm">{item.content}</p>
                <span className="text-xs text-zinc-300 mt-1 block">{formatTime(item.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;

