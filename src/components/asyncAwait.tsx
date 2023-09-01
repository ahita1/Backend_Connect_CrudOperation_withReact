import { useEffect, useState } from "react" 
import axios, { AxiosError } from "axios";
interface User {
    id: number;
    name: string;
    email: string;
    // Add more properties as needed
  }
const asyncAwait = () => {
    const [users , setUsers] = useState<User[]>([])
    const [error , setError] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const res = await axios
            .get<User[]>("https://jsonplaceholder.typicode.com/users")
            setUsers(res.data)
            } catch (err) {
                setError((err as AxiosError).message)
            }
        }
        fetchUser()
        // .then((res) => setUsers(res.data))
        // .catch((err) => {
        //     setError(err.message)
        // } , [])
    })
  return (
    <div>
        
    </div>
  )
}

export default asyncAwait
