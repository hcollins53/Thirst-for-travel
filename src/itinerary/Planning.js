import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddNewTrip } from "./TripProvider" 
export const PlanATrip = () => {
    const [trip, updateTrip] = useState({
        name: "",
        user: 0,
        start_date:"",
        end_date: ""
    })
    const navigate = useNavigate()
    const localTravelUser = localStorage.getItem("travel_user")
    const travelUser = JSON.parse(localTravelUser)
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newTrip= {
            name: trip.name,
            user: travelUser.userId,
            start_date: trip.start_date,
            end_date: trip.end_date
        }

       AddNewTrip(newTrip).then(
            response => response.json())
            .then((trip) => {
               navigate(`/itinerary/${trip.id}`)
               //navigate to google maps and adding places to itinerary
            }) 

    }
    return <>
            <div className="bg-silver  w-screen h-screen">
            <form className="text-center pt-48 rounded font-body ml-96 w-1/3">
                <h1 className="mb-4 text-2xl w-56 ml-28">Plan a New Trip</h1>
                <fieldset className="mb-4">
                    <label> Trip Name </label>
                    <input type="text" 
                            className="rounded border-b-black"
                            placeholder= "eg. Summer in Rome"
                            value = {trip.name} 
                            onChange={
                                (evt) => {
                                    const copy = {...trip}
                                    copy.name = evt.target.value
                                    updateTrip(copy)
                                }
                            } />
                </fieldset>
                <fieldset>
                
                    <div className="flex items-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select start date"
                        value={trip.start_date}
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.start_date = evt.target.value
                                updateTrip(copy)
                            }
                        }/>
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select end date"
                        value={trip.end_date}
                        onChange={
                            (evt) => {
                                const copy = {...trip}
                                copy.end_date = evt.target.value
                                updateTrip(copy)
                            }
                        }/>
                    </div>
                    </div>

                    
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label>End Date </label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="End Date"
                        value={itinerary.endDate}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.endDate = evt.target.value
                                updateItinerary(copy)
                            }
                        } />
                </div>
            </fieldset> */}
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mb-4 mt-2 btn btn-lion btn-sm">
                Start Planning
            </button>
            </form>
            </div>
    </>
}