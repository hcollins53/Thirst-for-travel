import { useEffect, useState } from "react"
import { getTripById, getUserTrips } from "../itinerary/TripProvider"
import { getTransportationByTripId } from "../provider/TransportationProvider"

import { TransportForm } from "./TransportForm"


export const TransportationList = () => {
    const [tripId, setTripId] = useState("")
    const [trips, setTrips] = useState([])
    const [transportation, setTransportation] = useState([])
    const [trip, setTrip] = useState({})
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
            getTripById(parseInt(tripId)).then(data => {
                    setTrip(data)})
    
            }},[tripId])
    const GrabTrip = (evt) => {
        evt.preventDefault()
        setTripId(evt.target.value)
    }
    return <>
    <div className="border-b-2 border-midnightBlue shadow-md">
        <img src="https://www.nec.com/en/global/solutions/transportation/images/transportation_header_pc.jpg"/>
    </div>
    <article className="mx-auto flex items center justify-center flex-col">
    <div className="text-center mt-6 text-2xl text-maroonBrown">Which Trip do you want view transportation for?</div>
    <select className="w-56 rounded-lg mx-auto m-4" onClick={(evt) => GrabTrip(evt)}>
     <option name= "trip">Choose a Trip</option>

        {
        trips.map((trip) => {
        return (
            <option 
                value={trip.id}> {trip.name}</option> 
        )})
        }
    </select>
    <div className="overflow-x-auto mx-auto">
        <table className="table border-collapse border border-darkGray rounded-lg">
        <thead>
      <tr>
        <th></th>
        <th>Mode of Transportation</th>
        <th>Departure Location</th>
        <th>Date</th>
        <th>Time</th>
        <th>Arrival Location</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
        {
            transportation.length > 0 ?  transportation.map(transport => {
                return <> <tr>
                <th></th>
                <td className="">{transport.transport_type}</td>
                <td>{transport.dep_location.name}</td>
                <td>{transport.dep_date}</td>
                <td>{transport.dep_time}</td>
                <td>{transport.arr_location.name}</td>
                <td>{transport.arr_time}</td>
              </tr></>
            }): ""
        }
</tbody>
</table>
    </div>
    <div>
        <label htmlFor="my-modal-3" className="btn bg-dustyRose w-52 flex justify-center mx-auto">Add new transportation</label>
        </div>
    <a className="underline text-right mr-10" href={"https://www.google.com/travel/flights"} target="_blank">Need to search for Flights?</a>
    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal backdrop-blur-sm">
  <div className="modal-box relative justify-between flex flex-row bg-silver w-6/12 max-w-5xl">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div className="flex justify-evenly">
        <div className=" p-4 shadow-lg">
        <div className="flex flex-col">
            <div>{ 
            <TransportForm trip={trip} tripId={tripId} />
}
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    </article>
    
    </>
}

// possible icons?