import AxiosInstance from "./AxiosInstance"

const UserService = {
    storeUser: async (data:any) => {
        try {
            const response = await AxiosInstance.post('/user/storeUser', data)
            return response
        } catch (error) {
            throw error;
        }
    },
    loadUsers: async () => {
        try {
            const response = await AxiosInstance.get('/user/loadUsers');
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId: string, data:any) => {
        try {
            const response = await AxiosInstance.put(`/user/updateUser/${userId}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default UserService