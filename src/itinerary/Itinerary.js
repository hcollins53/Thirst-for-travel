import { useEffect, useState } from "react"


export const AddingToTheItinerary = () => {
    // const [trip, setTrip] = useState({})
    // const localTravelUser = localStorage.getItem("travel_user")
    // const travelUser = JSON.parse(localTravelUser)
    // useEffect(
    //     () => {
    //        getItinerary(travelUser)
    //          .then((data) => {
    //             const singleItinerary = data[0]
    //             setTrip(singleItinerary)
    //          })
            
    //     },
    //     [] 
    // )
    return <>
    {/* <h2>Trip To {trip.name}</h2>
    <p> 🗓️{trip.startDate}-{trip.endDate} </p> */}
    <p>Explore</p>
    //see if I can find an api that shows top places to visit the area you selected
    <p>Places to Visit</p> 
    //Using the google map api to search and add Places to this itinerary
    //make a new array that stores the places you want to travel to
    <p>Daily Itinerary</p>
    //see if I can split up the itinerary into each day
    </>
}

//google maps api to be in an absolute position on the right side
//a picture of the place you want to visit in the background of the title
//navbar the links on the left side of the page (also an absolute position)

