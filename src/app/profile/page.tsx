"use client"
import axios from "axios"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default () => {
    const router = useRouter()

    const OnLogOut = async () => {
        try {
            const res =  await axios.post(`/api/users/logout`)
            console.log(res.data)
            toast.success("Logout successful")
            router.push("/login")
        }
        catch(err: any) {
            console.error(err.message)
            toast.error(err.message)
        }
    }

    return (
        <div className="flex items-center justify-evenly">
            <span>
                profile page
            </span>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8" 
                onClick={OnLogOut}
            >
                Log out
            </button>
        </div>
    )
}