const localUser = localStorage.getItem("travel_user")
    const user = JSON.parse(localUser)

    export const AddToPackingList = (newItem) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/packinglists`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             },
            body: JSON.stringify(newItem) 
         })
     }
     export const getPackingListByTripId = (trip) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/packinglists?trip=${trip}`, {
            headers: {
                "Accept": "application/json",
               "Authorization": `Token ${token}`
            }
        })
                .then(res => res.json())
    }
    export const DeleteItem = (packing) => {
        const token = user["token"]
        return fetch(`http://localhost:8000/packinglists/${packing.id}`, {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": `Token ${token}`
             }
         })
     }