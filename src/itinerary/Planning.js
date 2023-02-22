import { useState } from "react"

export const PlanATrip = () => {
    const [itinerary, updateItinerary] = useState({
        name: "",
        userId: 0,
        startDate: "",
        endDate: ""
    })
    return <>
    <main>
        <section>
            <form>
                <h1>Plan A New Trip</h1>
                <fieldset>
                    <label> Where do you want to go?</label>
                    <input type="text" 
                            placeholder= "eg. Paris, Tokyo, London"
                            value = {itinerary.name} 
                            onChange={
                                (evt) => {
                                    const copy = {...itinerary}
                                    copy.name = evt.target.value
                                    update
                                }
                            } />
                </fieldset>
            </form>
        </section>
    </main>
    </>
}