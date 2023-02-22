import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getLogin } from "../ApiManager";

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getLogin({ email })
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("travel_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="font-body w-screen h-screen image">
            <section className="flex justify-center mb-4">
                <form className="signIn" onSubmit={handleLogin}>
                    <h2 className="signIn_h2">Please sign in</h2>
                    <fieldset className="m-4">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="m-4">
                        <button type="submit" className="shadow-lg">
                            Sign in and start planning today
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="flex justify-center relative">
                <Link className=" bg-slate-200 rounded-lg underline" to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}