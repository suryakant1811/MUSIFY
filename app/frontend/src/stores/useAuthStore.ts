import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthStore {
	isAdmin: boolean;
	isLoading: boolean;
	checkAdminStatus: () => Promise<void>;
  reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAdmin: false,
	isLoading: false,

	checkAdminStatus: async () => {
		set({ isLoading: true });
		try {
			const response = await axiosInstance.get("/admin/check");
      console.log(response)
			set({ isAdmin: response.data.admin });
		} catch (error) {
		  console.log(error)
		} finally {
			set({ isLoading: false });
		}
	},
  reset: () =>{
    set({isAdmin:false})
  }

}));