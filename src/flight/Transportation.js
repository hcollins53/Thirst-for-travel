import { useEffect, useState } from "react"
import { getTripById, getUserTrips } from "../itinerary/TripProvider"
import { getTransportationByTripId } from "../provider/TransportationProvider"
import { Link } from "react-router-dom"


export const TransportationList = () => {
    const [tripId, setTripId] = useState("")
    const [trips, setTrips] = useState([])
    const [transportation, setTransportation] = useState([])
    useEffect(()=> {
        getUserTrips().then((data)=> {
            setTrips(data)
        })
    },[])
    useEffect(() => {
      if(tripId) { 
        getTransportationByTripId(tripId).then((data) => {
            setTransportation(data)
        })
            }},[tripId])
    const GrabTrip = (evt) => {
        evt.preventDefault()
        setTripId(evt.target.value)
    }
    return <>List of Transportation
    <div>Which Trip do you want view transportation for?</div>
    <select onClick={(evt) => GrabTrip(evt)}>
     <option name= "trip">Choose a Trip</option>

        {
        trips.map((trip) => {
        return (
            <option 
                value={trip.id}> {trip.name}</option> 
        )})
        }
    </select>
    <div>
        {
            transportation.length > 0 ?  transportation.map(transport => {
                return <><div> {transport.transport_type}</div>
                <div></div> </>
            }): ""
        }
    </div>
    <Link to={`/transportForm/${tripId}`}>Add new transportation</Link>
    <a href={"https://www.google.com/travel/flights"} target="_blank">Search for Flights?</a>
    </>
}