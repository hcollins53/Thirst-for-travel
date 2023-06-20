import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GetGeoCodes, getActivities, getLocationById, getRestaurants } from "./TripProvider"
import { AddNewActivity, AddTripActivity, getActivityByName } from "../provider/ActivityProvider"

export const FoodList = () => {
    const { locationId } = useParams()
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [location, setLocation] = useState({})
    const [geoCode, setGeoCode] = useState({})
    const [activities, setRestaurants] = useState([])
    const [activityObj, setActivity] = useState({})
    const[lat, setLat] = useState("")
    const[lng, setLng] = useState("")
    useEffect(() => {
        getLocationById(parseInt(locationId)).then((data) => {
            setLocation(data)
    })}, [])
    useEffect(() => {
        if(location.name){
        GetGeoCodes(location.name).then((data)=> {
            setGeoCode(data)
        // getActivities(location.name).then((data) => {
        //     setActivities(data)
        })
        
    }}, [location])
    useEffect(() => {
        if(geoCode.hits){
        const lat = geoCode?.hits[0]?.point?.lat
        const lng = geoCode?.hits[0]?.point?.lng
        setLat(lat)
        setLng(lng)
        getRestaurants(lat, lng).then((data)=> {
                    setRestaurants(data)
                })}
        
    }, [geoCode])
    const handleSaveButtonClick = (event, activity) => {
        event.preventDefault()

        const newActivity= {
            name: activity.name,
            location: location.id,
            place_id: activity.place_id,
            rating: activity.rating,
            vicinity: activity.vicinity,
            lat: activity?.geometry?.location?.lat,
            lng: activity?.geometry?.location?.lng
        }

       AddNewActivity(newActivity).then(
            response => response.json())
            .then(() => {
                getActivityByName(activity.name).then((data) =>{
                    const singleActivity = data[0]
                    setActivity(singleActivity)
                })
               
    })}
   const AddNewTripActivity = () => {
     const newTripActivity= {
                    location: parseInt(locationId),
                    activity: activityObj.id
                }
                console.log(newTripActivity)
                AddTripActivity(newTripActivity, parseInt(tripId)).then(
                    response => response.json()
                )
            .then(() =>{
                navigate(`/itinerary/${tripId}`)})
   }
   useEffect(() => {
    if(activityObj.name){
        AddNewTripActivity()
    }
   },[activityObj])
    return <>
    <div className=" font-title font-bold">
        <div className="">
            <div className="bg-paleGray flex flex-col ">
    <div className="text-center text-3xl pt-4 pb-4 bg-paleGray">Restaurants to do {location.name}</div>
    <Link className="text-center mx-auto justify-center mb-4 under" to={`/locations/${location.location}/trip/${tripId}`}>Looking for activities to do?</Link>
    </div>
    <div className="mx-auto bg-paleGray">
    
        { activities?.results?.map(activity => {
        return <>
        <div className="mx-auto flex flex-col text-center justify-center w-[300px]">
        <Link to={`/activityDetail/${activity.place_id}/${lat}/${lng}`}> {activity.name} </Link>
        {/* <img className="rounded-full shadow-xl w-60 h-60" src={activity.pictures[0]} /> */}
        <div>
        rating: {activity.rating}</div>
        <div>{activity.vicinity}</div>
        <div>{activity?.types[0]}</div>
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent, activity)}
             className="mb-4 mt-2 btn w-[200px] mx-auto bg-maroonBrown btn-sm">
                Add Activity to Itinerary</button>
        </div>
        </>
        })}
        </div>
</div>
</div>

</>}