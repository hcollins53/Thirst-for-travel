const localUser = localStorage.getItem("travel_user")
    const user = JSON.parse(localUser)
const google_key = process.env.REACT_APP_GOOGLE_KEY
    export const AddNewActivity = (newActivity) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/activities`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(newActivity) 
         })
     }
     export const AddTripActivity = (newTripActivity, tripId) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips/${tripId}/activity`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(newTripActivity) 
         })
     }
     export const getActivityByName = (name) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/activities?name=${name}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const DeleteTripActivity = (activity, tripId) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/trips/${tripId}/delete_activity`, {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(activity) 
         })
     }
     export const getActivitiesFromTrip = (tripId) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/activities?trip=${tripId}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const getActivityDetails = (placeId) => {
        return fetch(`https://thirst-for-travel.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${google_key}`, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(response => response.json())
    }

    