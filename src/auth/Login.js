import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { loginUser } from "./LoginProvider";


export const Login = ({setToken}) => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
                .then(res => {
                    if ("valid" in res && res.valid && "token" in res) {
                        setToken(res.token, res.userId)
                        navigate("/planning")
                    }
                    else {
                        invalidDialog.current.showModal()
                    }
                })
    }

    return (
        <main className="font-body w-screen h-screen">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <div className="flex">
            <div className="w-full md:w-1/2 bg-gray-100 p-8 mx-auto">
                <h1 className="text-4xl font-bold mb-8">Please Log in before continuing</h1>
                <form className="" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">Username</label>
                        <input ref={username} type="text" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Enter your username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold">Password</label>
                        <input ref={password} type="password" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Enter your password"/>
                    </div>
                    <button className="bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">Login</button>
                </form>
                <section className="m-auto w-96 bg-slate-200 bg-opacity-60 shadow-lg rounded-lg">
                Do not have an account? <Link to="/register">Register here</Link>
            </section>
            </div>
            <div className=" md:block w-full md:w-1/2">
                <img src="https://media.cntraveler.com/photos/5a70f9d68af0dc48d25daf9f/16:9/w_4447,h_2501,c_limit/Haedong-Yonggungsa-Temple-GettyImages-874460458.jpg" alt="Beautiful Image" class="object-cover w-full h-[750px]"/>
                </div>
            </div>
        </main>
    )
}