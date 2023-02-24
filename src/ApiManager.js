export const getLogin = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
}
export const getRegister = (user) => {
    return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }
    

export const findEmail = (email) => {
        return fetch(`http://localhost:8088/users?email=${email}`)
                .then(res => res.json())
}
export const AddItinerary = (itineraryToSEndToApi) => {
    return fetch(`http://localhost:8088/itineraries`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
        body: JSON.stringify(itineraryToSEndToApi) 
     })
 }
 
export const getItinerary = (travelUser) => {
    return fetch(`http://localhost:8088/itineraries?userId=${travelUser.id}`)
            .then(res => res.json())
}