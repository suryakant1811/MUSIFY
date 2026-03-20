import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../stores/useChatStore";

const ChatInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();

	const handleSend = () => {
		if (!selectedUser || !user || !newMessage) return;
		sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className='p-2  border-t  border-zinc-800'>
			<div className='flex  gap-2'>
				<input
					placeholder='Start Chat'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-zinc-800 w-[200%] p-1 border-none'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<button onClick={handleSend} disabled={!newMessage.trim()}>
					<Send className='size-7 p-1 text-black bg-green-500' />
				</button>
			</div>
		</div>
	);
};
export default ChatInput;