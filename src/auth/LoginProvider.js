export const loginUser = (user) => {
    return fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"

          //VM89:1 Uncaught (in promise) SyntaxError: Unexpected end of JSON input
        },
        body: JSON.stringify(user)
      })
            .then(res => res.json())
}
export const registerUser = (user) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(user)
      })
            .then(res => res.json())
    }