'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import LoaderComponent from "../LoaderComponent"
import { toast } from "react-hot-toast"
import axios from "axios"

export default () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "", username: "", password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        (   
            user.email != "" && 
            user.username != "" && 
            user.password != ""
        )
            ?
        setButtonDisabled(false)
            :
        setButtonDisabled(true)
    }, [user])

    const onSignUp = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/users/signup', user)
            console.log(res.data)
            if(res.data.status === 400) {
                setErrorMsg(res.data.message)
            }
            else {
                toast.success('Sign-up success')
                router.push("/profile")
            }
        }
        catch(err: any) {
            toast.error(err.message)
            console.log(`Sign-up failed: ${err.message}`)
            setErrorMsg(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    if(loading) {
        return <LoaderComponent/>
    }

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center flex-col bg-black">
            <div className="w-[50%] border rounded-sm p-4 flex justify-center flex-col">
                <input 
                    type="text"
                    placeholder="email"
                    value={user.email}
                    onChange={event => setUser({...user, email: event.target.value})}
                    className="w-[90%] p-4 m-auto mt-2 mb-2 rounded-md bg-gray-200 text-black"
                />
                <input 
                    type="text"
                    placeholder="username"
                    value={user.username}
                    onChange={event => setUser({...user, username: event.target.value})}
                    className="w-[90%] p-4 m-auto mt-2 mb-2 rounded-md bg-gray-200 text-black"
                />
                <input 
                    type="text"
                    placeholder="password"
                    value={user.password}
                    onChange={event => setUser({...user, password: event.target.value})}
                    className="w-[90%] p-4 m-auto mt-2 mb-2 rounded-md bg-gray-200 text-black"
                />
                <button 
                    className={`w-[90%] m-auto mt-2 mb-2 p-2 rounded-md border hover:bg-gray-800 hover:${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"} text-white`}
                    disabled={buttonDisabled}
                    onClick={onSignUp}
                >Sign Up</button>
            </div>
            <Link href={'/login'} className="m-4 underline text-white">
                Visit Login page?
            </Link>
            <div className={`${errorMsg} ? "border p-3 mt-4" : "hidden"`}>
                {errorMsg}
            </div>
        </div>
    )
}