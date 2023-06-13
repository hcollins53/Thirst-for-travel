const google_key = process.env.REACT_APP_GOOGLE_KEY
const localUser = localStorage.getItem("travel_user")
const user = JSON.parse(localUser)

export const getHotelListByLocation = (lat, lng) => {
    return fetch(`https://thirst-for-travel.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=lodging&key=${google_key}`, {
                headers: {
                    "Accept": "application/json"
                }
            }).then(response => response.json())
}

export const AddNewLodging = (newLoding) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/hotels`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             "Accept": "application/json",
            "Authorization": `Token ${token}`
         },
        body: JSON.stringify(newLoding) 
     })
}

export const getLodgingByName = (name) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/hotels?name=${name}`, {
        headers: {
            "Accept": "application/json",
           "Authorization": `Token ${token}`
        }
    })
            .then(res => res.json())
}