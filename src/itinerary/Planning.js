import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddItinerary } from "../ApiManager"

export const PlanATrip = () => {
    const [itinerary, updateItinerary] = useState({
        name: "",
        userId: 0,
        startDate: "",
        endDate: ""
    })
    const navigate = useNavigate()
    const localTravelUser = localStorage.getItem("travel_user")
    const travelUser = JSON.parse(localTravelUser)
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const itineraryToSEndToAPI= {
            name: itinerary.name,
            userId: travelUser.id,
            startDate: itinerary.startDate,
            endDate: itinerary.endDate
        }

       AddItinerary(itineraryToSEndToAPI).then(
            response => response.json())
            .then(() => {
               navigate("/itinerary")
               //navigate to google maps and adding places to itinerary
            }) 

    }
    return <>
            <div className="bg-silver  w-screen h-screen">
            <form className="text-center pt-48 rounded font-body ml-96 w-1/3">
                <h1 className="mb-4 text-2xl w-56 ml-28">Plan a New Trip</h1>
                <fieldset className="mb-4">
                    <label> Where do you want to go? </label>
                    <input type="text" 
                            className="rounded border-b-black"
                            placeholder= "eg. Paris, Tokyo, London"
                            value = {itinerary.name} 
                            onChange={
                                (evt) => {
                                    const copy = {...itinerary}
                                    copy.name = evt.target.value
                                    updateItinerary(copy)
                                }
                            } />
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <label>Start Date </label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Start Date"
                        value={itinerary.startDate}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.startDate = evt.target.value
                                updateItinerary(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
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
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mb-4 mt-2 btn">
                Start Planning
            </button>
            </form>
            </div>
    </>
}