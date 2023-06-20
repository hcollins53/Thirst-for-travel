import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTripById } from "../itinerary/TripProvider"
import { AddNewTransportation } from "../provider/TransportationProvider"

export const TransportForm = ({trip, tripId, getTransportation}) => {
    const navigate = useNavigate()

    const [transportation, update] = useState({
        trip: 0,
        dep_date: "",
        transport_type: "",
        dep_time: "",
        arr_time: "",
        dep_location: 0,
        arr_location: 0
    })
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newTransport= {
            trip: parseInt(tripId),
            dep_date: transportation.dep_date,
            transport_type: transportation.transport_type,
            dep_time: transportation.dep_time,
            arr_time: transportation.arr_time,
            dep_location: parseInt(transportation.dep_location),
            arr_location: parseInt(transportation.arr_location)
        }
       AddNewTransportation(newTransport)
            .then(() => {
                getTransportation()
            }) 
    }
    return <>
    <article className="font-title h-full w-full bg-paleGray"> 
    <form className="">
            <h2 className="text-2xl pt-4 pb-4 text-center font-bold">Add a new transportation for {trip.name}</h2>
            <div className="border-2 border-black shadow-xl rounded-xl mx-auto p-4 bg-silver text-center w-[500px]">
            <fieldset className="mb-2">
                <div className="form-group flex justify-center flex-col">
                    <label className="">Mode of transportation</label>
                    <input
                        required autoFocus
                        type="text"
                        placeholder="flight, train, etc"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={transportation.transport_type}
                        onChange={
                            (evt) => {
                                const copy = {...transportation}
                                copy.transport_type = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="">
                <div className="form-group flex justify-center flex-col">
                    <label htmlFor="description">Departure Location </label>
                    <select 
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[220px]" 
                            onChange={
                            (evt) => {
                                const copy = {...transportation}
                                copy.dep_location = evt.target.value
                                update(copy)
                            }}>
                        <option name= "dep_location">Which city are you departing from?</option>

                        {
                      trip.name ?  trip.locations.map((location) => {
                           return (
                            <option 
                                value={location.location}> {location.location_name}</option> 
                           )
                        }) : ""
                    } 
                         </select>
                </div>
            </fieldset>
            <fieldset className="mt-2">
                <div className="form-group flex justify-center flex-col">
                    <label htmlFor="description">Arrival Location </label>
                    <select 
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[220px]" 
                            onChange={
                            (evt) => {
                                const copy = {...transportation}
                                copy.arr_location = evt.target.value
                                update(copy)
                            }}>
                        <option name= "arr_location">Which city are you arriving to?</option>

                        {
                       trip.name ? trip.locations.map((location) => {
                           return (
                            <option 
                                value={location.location}> {location.location_name}</option> 
                           )
                        }) : ""
                    } 
                         </select>
                </div>
            </fieldset>
            <fieldset className="mt-2">
                <div className="form-group flex justify-center flex-col">
                    <label htmlFor="image">Departure Date</label>
                    <input required autoFocus
                        type="text"
                        placeholder="Date of departure"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={transportation.dep_date}
                        onChange={
                            (evt) => {
                                const copy = {...transportation}
                                copy.dep_date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="mt-2">
                <div className="form-group flex justify-center flex-col">
                    <label htmlFor="image">Departure Time</label>
                    <input required autoFocus
                        type="text"
                        placeholder="Time of departure"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={transportation.dep_time}
                        onChange={
                            (evt) => {
                                const copy = {...transportation}
                                copy.dep_time = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="mt-2">
                <div className="form-group flex justify-center flex-col">
                    <label htmlFor="image">Arrival Time</label>
                    <input required autoFocus
                        type="text"
                        placeholder="Time of Arrival"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={transportation.arr_time}
                        onChange={
                            (evt) => {
                                const copy = {...transportation}
                                copy.arr_time = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn bg-dustyRose mt-2 font-light">
                Submit New Transportation
            </button>
            </div>
        </form>
    </article>
    </>
}