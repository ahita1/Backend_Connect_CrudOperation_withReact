import apiClient from "./api-client"
export interface User {
    id: number;
    name: string;
  }

class userService {
getAllUsers() {
    const Controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: Controller.signal,
    })
    return {request , cancel : () => Controller.abort()}
}
    deleteUser (id : number) {
        return apiClient.delete(`/users/${id}`)
    }
}
export default new userService()