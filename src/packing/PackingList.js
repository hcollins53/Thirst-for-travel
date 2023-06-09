import { useEffect, useState } from "react"
import { getTripById, getTrips, getUserTrips } from "../itinerary/TripProvider"
import { AddToPackingList, DeleteItem, getPackingListByTripId } from "../provider/PackingListProvider"

export const PackingList = () => {
    const[trips, setTrips] = useState([])
    const[packinglists, setPacking] = useState([])
    const[packing, updatePacking] = useState({})
    const [tripId, setTripId] = useState("")
    const localUser = localStorage.getItem("travel_user")
    const[trip, setTrip] = useState({})
    const user = JSON.parse(localUser)
    useEffect(()=> {
        getUserTrips().then((data)=> {
            setTrips(data)
        })
    },[])
    useEffect(() => {
      if(tripId) { getPackingListByTripId(tripId).then((data) => {
            setPacking(data)
        })}
        getTripById(tripId).then((data)=> {
            setTrip(data)
        })
    },[tripId])
    const GrabTrip = (evt) => {
        setTripId(evt.target.value)
        
    }
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newItemToPack= {
            item: packing.item,
            amount: packing.amount,
            trip: tripId
        }

       AddToPackingList(newItemToPack).then(
            response => response.json())
            .then(() => {
                getPackingListByTripId(tripId).then((data) => {
                    setPacking(data)
                })
    })}
    const handleDelete = (event, packing) => {
        event.preventDefault()
        DeleteItem(packing).then(() => {
            getPackingListByTripId(tripId).then((data) => {
                setPacking(data)
            })
         })  
    }
    return<>
    <div>Which Trip do you want a packing list for?</div>
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
    <div class="bg-white p-4 rounded-lg">
        <div className="relative bg-inherit">
        <label for="packing" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">What do you want to add to your packing list?</label>
        <input type="text" id="packing" name="packing" className="peer bg-transparent h-10 w-72 rounded-lg text-gray-600 ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="item"
        value = {packing.item} 
        onChange={
            (evt) => {
                const copy = {...packing}
                copy.item = evt.target.value
                updatePacking(copy)
            }
        }/>
        <input type="text" id="packing" name="packing" className="peer bg-transparent h-10 w-72 rounded-lg text-gray-600 ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="amount"
        value = {packing.amount} 
        onChange={
            (evt) => {
                const copy = {...packing}
                copy.amount = evt.target.value
                updatePacking(copy)
            }
        }/>
        
        <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mb-4 mt-2 btn btn-lion btn-sm">
                Add
            </button>
            </div>
    </div>
    {
        trip.name ? <h3> Packing List for {trip.name}</h3> : ""
    }
        {
            packinglists.length > 0 ? packinglists.map(packing => {
            return<>
            <div>item: {packing.item} amount: {packing.amount} </div> 
            <div className="">
                  <button className="btn-sm btn-justColor font-light" onClick={(clickEvent) => handleDelete(clickEvent, packing)}>
                    x
                  </button>
                </div> </> }): ""
        }
    </>
}