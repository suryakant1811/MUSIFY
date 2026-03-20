import { HeadphonesIcon, Music } from "lucide-react";
import { useChatStore } from "../stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const Friends = () => {
  const { users, fetchUsers, userActivities, onlineUsers} = useChatStore();
  const { user } = useUser();

 

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-zinc-700">
        <div className="text-xl shrink-0 ">
          <h2 className="font-bold">What others are listining</h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <div className="card  shadow-lg no-scrollbar  max-h-120  overflow-y-scroll">
        {users.map((item) => {

          const activity = userActivities.get(item.clerkId)
          const isPlaying = activity && activity !== "Idle"

          return (
            <div
              key={item._id}
              className="cursor-pointer hover:bg-z/30 p-3 rounded-md transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="avatar">
                  <div className="w-16 h-16 m-2 rounded-full">
                    <img src={item?.imageUrl} alt="image" />
                    <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full
                      ${onlineUsers.has(item.clerkId) ? "bg-green-500" : "bg-zinc-500"}
                      `}></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {item?.fullName}
                      </span>
                      {isPlaying && (
                        <Music className="size-3 text-emerald-400 ml-24 mt-10 shrink-0" />
                      )}
                    </div>

                    {isPlaying ? (
                      <div className="-mt-10 ml-2">
                        <div className="mt-1 text-sm text-white font-medium truncate">
                          {activity.replace("Playing","").split("by ")[0]}
                        </div>
                        <div className="mt-1 text-sm truncate">
                          {activity.split("by ")[1]}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-7 ml-2 text-sm  text-zinc-500"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
