//const api_key = process.env.REACT_APP_API_KEY
const geoCode_key = process.env.REACT_APP_GEOCODE_KEY
//const Trip_key = process.env.REACT_APP_TRIP_KEY
const google_key = process.env.REACT_APP_GOOGLE_KEY
const getToken = () => {
    const localUser = localStorage.getItem("travel_user")
    const user = JSON.parse(localUser)
    return user
}

    export const AddNewTrip = (newTrip) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/trips`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${localUser.token}`
             },
            body: JSON.stringify(newTrip) 
         })
     }
     export const getTrips = () => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/trips`, { 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localUser.token}`
          }})
                .then(res => res.json())
    }
    export const getUserTrips = () => {
       const localUser = getToken()
        // const userId = user["userId"]
        return fetch(`http://localhost:8000/trips?user=${localUser.userId}`, { 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localUser.token}`
          }})
                .then(res => res.json())
    }
    export const getTripById = (tripId) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/trips/${tripId}`, {
            headers: {
                "Accept": "application/json",
            //    "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const AddNewLocation = (newLocation) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/locations`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${localUser.token}`
             },
            body: JSON.stringify(newLocation) 
         })
     }
    export const AddTripLocation = (newTripLocation, tripId) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/trips/${tripId}/location`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${localUser.token}`
             },
            body: JSON.stringify(newTripLocation) 
         })
     }
     export const getLocationByName = (name) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/locations?name=${name}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${localUser.token}`
            }
        })
                .then(res => res.json())
    }
    export const getLocationById = (id) => {
        const localUser =  getToken()
        return fetch(`http://localhost:8000/locations/${id}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${localUser.token}`
            }
        })
                .then(res => res.json())
    }
    export const getLocationsByTrip = (tripId) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/trips/${tripId}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${localUser.token}`
            }
        })
                .then(res => res.json())
    }
    export const getHotelsByTrip = (tripId) => {
        const localUser = getToken()
        return fetch(`http://localhost:8000/hotels?trip=${tripId}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${localUser.token}`
            }
        })
                .then(res => res.json())
    }
    // export const getActivities = (lat, lng) => {
    //     return fetch(`https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lng}&radius=20`, {
    //         headers: {
    //             "Authorization": `Bearer ${api_key}`
    //         }
    //     }).then(response => response.json())
    // }
    export const GetGeoCodes = (city) => {
        return fetch(`https://graphhopper.com/api/1/geocode?q=${city}&limit=1&key=${geoCode_key}`)
        .then(response => response.json())
    }
    // export const getActivities = (lat, lng) => {
    //     return fetch(`https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=2000&lon=${lng}&lat=${lat}`, {
    //                 headers: {
    //                     "X-RapidAPI-Key": "633f5b03ddmshe0d1e8c5dd7be14p12e4b2jsnbb1b6270baf3"
    //                 }
    //             }).then(response => response.json())
    // }
    //  export const getActivities = (city) => {
    //     return fetch(`https://thirst-for-travel.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/search?key=${Trip_key}&searchQuery=${city}&category=attraction&language=en`, {
    //                 headers: {
    //                     "origin": "http://www.hannahcollins.com:3000",
    //                     "referer": "http://www.hannahcollins.com:3000"
    //                 }
    //             }).then(response => response.json())
    // }
    // export const getActivityByLocationId = (locationId) => {
    //     return fetch(`https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${Trip_key}`, {
    //                 headers: {
    //                     "Accept": "application/json"
    //                 }
    //             }).then(response => response.json())
    // }

    export const getActivities = (lat, lng) => {
        return fetch(`https://thirst-for-travel.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${google_key}`, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(response => response.json())
    }
    export const getRestaurants = (lat, lng) => {
        return fetch(`https://thirst-for-travel.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${google_key}`, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(response => response.json())
    }