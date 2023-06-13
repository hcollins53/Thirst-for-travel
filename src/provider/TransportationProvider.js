const google_key = process.env.REACT_APP_GOOGLE_KEY
const localUser = localStorage.getItem("travel_user")
const user = JSON.parse(localUser)


export const AddNewTransportation = (newTransport) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/transports`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             "Accept": "application/json",
            "Authorization": `Token ${token}`
         },
        body: JSON.stringify(newTransport) 
     })
}

export const getTransportationByTripId = (tripId) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/transports?trip=${tripId}`, {
        headers: {
            "Accept": "application/json",
           "Authorization": `Token ${token}`
        }
    })
            .then(res => res.json())
}