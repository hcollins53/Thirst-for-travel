
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "./LoginProvider";

export const Register = ({setToken}) => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        setToken(res.token, res.userId)
                        navigate("/planning")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="font-title w-screen h-screen">
            <div className="flex">
            <div className="w-full md:w-1/2 bg-gray-100 p-8 mx-auto">
                <h1 className="text-4xl font-bold mb-8">Please Register before continuing</h1>
                <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
                <form className="" onSubmit={handleRegister}>
                <div className="mb-4">
                        <label className="block text-lg font-semibold">First Name</label>
                        <input ref={firstName} type="text" name="firstName" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Enter your first name"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">Last name</label>
                        <input ref={lastName} name="lastName" type="text" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Enter your last name"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold">Username</label>
                        <input ref={username} type="text" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Enter your username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold">Password</label>
                        <input ref={password} type="password" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Enter your password"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold">Verify Password</label>
                        <input ref={verifyPassword} type="password" className="w-full border border-gray-300 px-4 py-2 rounded-lg" placeholder="Verify your password"/>
                    </div>
                    <button className="bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">Register</button>
                </form>
                <section className="m-auto w-96 bg-slate-200 bg-opacity-60 shadow-lg rounded-lg">
                Already registered? <Link to="/login">Login</Link>
            </section>
            </div>
            <div className="md:block w-2/3">
                <img src="https://www.thediscoveriesof.com/wp-content/uploads/2020/04/Beautiful-Travel-54.jpg" alt="Beautiful Image" className="object-cover h-screen w-full"/>
                </div>
            </div>
        </main>
    )
}