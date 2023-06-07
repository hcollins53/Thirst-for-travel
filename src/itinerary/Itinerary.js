import { useEffect, useState } from "react"
import { AddNewLocation, AddTripLocation, getLocationByName, getTripById } from "./TripProvider"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DeleteTripActivity, getActivitiesFromTrip } from "../provider/ActivityProvider"


export const AddingToTheItinerary = () => {
    const { tripId } = useParams()
    const [trip, setTrip] = useState({})
    const localTravelUser = localStorage.getItem("travel_user")
    const travelUser = JSON.parse(localTravelUser)
    const [tripLocation, setTripLocation] = useState({})
    const [activities, setActivities] = useState([])
    useEffect(
        () => {
           getTripById(parseInt(tripId))
             .then((data) => {
                setTrip(data)
             }).then(() => {
                getActivities()
             })
           
        },
        [] 
    )
    const getActivities = () => {
        getActivitiesFromTrip(parseInt(tripId)).then((data) => {setActivities(data)})
    }
    
    const [location, updateLocation] = useState({
        name: ""
    })

    const navigate = useNavigate()
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newLocation= {
            name: location.name
        }

       AddNewLocation(newLocation).then(
            response => response.json())
            .then(() => {
                getLocationByName(location.name).then((data) =>{
                    const singleLocation = data[0]
                    setTripLocation(singleLocation)
                })
                const newTripLocation= {
                    location: tripLocation.id
                }
                AddTripLocation(newTripLocation, parseInt(tripId)).then(
                    response => response.json()
                )
            .then(() =>{
                navigate(`/itinerary/${tripId}`)})
    })}
    const handleDelete = (event, activity, location) => {
        event.preventDefault()
        const ActivityLocation = {
            location: location.id,
            activity: activity.id
        }
        DeleteTripActivity(ActivityLocation, parseInt(tripId)).then(() => {
            getActivities()
         })  
    }
    return <>
    <h2>Trip To {trip?.name}</h2>
    <p> 🗓️{trip?.start_date}-{trip?.end_date} </p>
    <p>Explore</p>
    <div class="bg-white p-4 rounded-lg">
    <div class="relative bg-inherit">
        <input type="text" id="location" name="location" className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"
        value = {location.name} 
        onChange={
            (evt) => {
                const copy = {...location}
                copy.name = evt.target.value
                updateLocation(copy)
            }
        }/>
        <label for="location" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Where do you want to go?</label>
        <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mb-4 mt-2 btn btn-lion btn-sm">
                Add
            </button>
    </div>
    </div>
    <p>locations</p>
    <div>
  {
    trip?.locations?.map(location => {
      const filteredActivities = activities.filter(activity => {
        return activity.activity_itinerary.filter(item => item.location === location.id);
        
      });

      return (
        <div key={location.id}>
          <Link to={`/locations/${location.location}/trip/${tripId}`}>
            {location.location_name}
          </Link>
          <p>Places to Visit</p>
          {
            filteredActivities.map(activity => (
              <div key={activity.id}>
                {activity.name}<div className="">
                  <button className="btn-sm btn-justColor font-light" onClick={(clickEvent) => handleDelete(clickEvent, activity, location)}>
                    x
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      );
    })
  }
</div>

   
    <p>Daily Itinerary</p>
    //see if I can split up the itinerary into each day
    </>
}
