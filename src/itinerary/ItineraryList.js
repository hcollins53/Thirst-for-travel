import { useEffect, useState } from "react"
import { getTrips, getUserTrips } from "./TripProvider"
import { Link } from "react-router-dom"

export const Itineraries = () => {
    const[itineraries, setItineraries] = useState([])
    useEffect(() => {
        getUserTrips().then((data) => {
            setItineraries(data)
        })
    }, [])
    return<>My Itineraries
    <div className="grid grid-cols-5 gap-4">
    {
        itineraries.map(itinerary => {
            return <> 
            <div className=" grid col-auto">
                <Link to={`/itinerary/${itinerary.id}`}> <img className="w-[200px]" src={itinerary.image}/> </Link>
            </div>
            </>
        })
    }
    </div>
     <Link className="btn" to="/planning">
                Plan a new trip
            </Link>

    </>
}