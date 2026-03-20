import UserListLeftSkeleton from "../Skeletons/UserListLeftSkeleton";
import { useChatStore } from "../stores/useChatStore";

const UserListLeft = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();

  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <div className="card  shadow-lg no-scrollbar  max-h-120  overflow-y-scroll">
          {isLoading ? (
            <UserListLeftSkeleton />
          ) : (
            users.map((item: any) => {
              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedUser(item)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.clerkId === item.clerkId
                      ? "bg-zinc-800"
                      : "hover:bg-zinc-800/80"
                  }`}
                >
                  {/* {item.firstName} */}

                  <div className="relative">
                    <div className="w-12 h-12 flex items-center">
                      <img className="w-full h-full rounded-full" src={item?.imageUrl} alt="image" />
                      <div
                      className={` absolute bottom-1 right-1 w-3 h-3 rounded-full ${onlineUsers.has(item.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}></div>
                      <div className="flex-1 min-w-0 ml-2  ">{item.firstName}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListLeft;
