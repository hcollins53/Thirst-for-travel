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
            end_date: trip.end_date,
            image: trip.image
        }

       AddNewTrip(newTrip).then(
            response => response.json())
            .then((trip) => {
               navigate(`/itinerary/${trip.id}`)
               //navigate to google maps and adding places to itinerary
            }) 

    }
    return <>
            <div className="planning h-screen bg-top">
                {/* <div>
                    <img src="https://loveincorporated.blob.core.windows.net/contentimages/gallery/650e9ba2-eeb9-40ad-af06-180d24416dde-plane-flying-takeoff-shutterstock.jpg"/>
                </div> */}
                <div className="bg-opacity-60 h-screen">
            <form className="text-center py-6 rounded mx-auto">
                <div className="bg-paleGray w-[600px] mx-auto bg-opacity-60">
                <h1 className="mb-10 pt-36 text-5xl font-body text-red-800 mx-auto">Create a New Adventure</h1>
                <fieldset className="font-title font-bold mb-10">
                    <label className="text-2xl"> Trip Name </label>
                    <input type="text" 
                            className="rounded border-b-2"
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
                <fieldset className="font-title font-bold mb-10">
                    <div className="items-center flex justify-center">
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
            <fieldset className="mb-4">
            <input type="text" 
                            className="rounded-lg border-b-1 font-title"
                            placeholder= "image url"
                            value = {trip.image} 
                            onChange={
                                (evt) => {
                                    const copy = {...trip}
                                    copy.image = evt.target.value
                                    updateTrip(copy)
                                }
                            } />
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mb-4 mt-2 btn bg-maroonBrown font-title">
                Start Planning
            </button>
            </div>
            </form>
            </div>
            </div>
    </>
}