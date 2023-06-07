const api_key = process.env.REACT_APP_API_KEY
const geoCode_key = process.env.REACT_APP_GEOCODE_KEY

const localUser = localStorage.getItem("travel_user")
    const user = JSON.parse(localUser)

    export const AddNewTrip = (newTrip) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(newTrip) 
         })
     }
     export const getTrips = () => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips`, { 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`
          }})
                .then(res => res.json())
    }
    export const getTripById = (tripId) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips/${tripId}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const AddNewLocation = (newLocation) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/locations`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(newLocation) 
         })
     }
    export const AddTripLocation = (newTripLocation, tripId) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips/${tripId}/location`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(newTripLocation) 
         })
     }
     export const getLocationByName = (name) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/locations?name=${name}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const getLocationById = (id) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/locations/${id}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const getLocationsByTrip = (tripId) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips/${tripId}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const getActivities = (lat, lng) => {
        return fetch(`https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lng}&radius=20`, {
            headers: {
                "Authorization": `Bearer ${api_key}`
            }
        }).then(response => response.json())
    }
    export const GetGeoCodes = (city) => {
        return fetch(`https://graphhopper.com/api/1/geocode?q=${city}&limit=1&key=${geoCode_key}`)
        .then(response => response.json())
    }