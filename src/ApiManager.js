export const getLogin = ({email}) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
}
export const getRegister = ({user}) => {
    return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }
    

export const findEmail = ({user}) => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
                .then(res => res.json())
}