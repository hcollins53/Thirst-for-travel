import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { findEmail, getRegister } from "../ApiManager"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        getRegister({user})
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("travel_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        findEmail({user})
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main className="mb-4 font-body w-screen h-screen image"style={{ textAlign: "center" }}>
            <form className="signIn" onSubmit={handleRegister}>
                <h1 className="font-semibold text-xl item-center m-4 border-b-2 border-gray-700">Please Register for Thirst for Travel</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button className="bg-slate-200 rounded-lg underline" type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}