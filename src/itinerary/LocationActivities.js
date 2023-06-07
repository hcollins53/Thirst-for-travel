import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { GetGeoCodes, getActivities, getLocationById } from "./TripProvider"
import { AddNewActivity, AddTripActivity, getActivityByName } from "../provider/ActivityProvider"

export const LocationActivities = () => {
    const { locationId } = useParams()
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [location, setLocation] = useState({})
    const [geoCode, setGeoCode] = useState({})
    const [activities, setActivities] = useState([])
    const [activityObj, setActivity] = useState({})
    useEffect(() => {
        getLocationById(parseInt(locationId)).then((data) => {
            setLocation(data)
    })}, [])
    useEffect(() => {
        if(location.name){
        GetGeoCodes(location.name).then((data)=> {
            setGeoCode(data)
        })}
    }, [location])
    useEffect(() => {
        if(geoCode.hits){
        const lat = geoCode?.hits[0]?.point?.lat
        const lng = geoCode?.hits[0]?.point?.lng
        getActivities(lat, lng).then((data)=> {
                    setActivities(data)
                })}
        
    }, [geoCode])
    const handleSaveButtonClick = (event, activity) => {
        event.preventDefault()

        const newActivity= {
            name: activity.name,
            location: location.id,
            cost: activity.price?.amount,
            description: activity.description,
            booking_link: activity.bookingLink,
            picture: activity.pictures[0],
            minimum_duration: activity.minimumDuration
        }

       AddNewActivity(newActivity).then(
            response => response.json())
            .then(() => {
                getActivityByName(activity.name).then((data) =>{
                    setActivity(data)
                })
                const newTripActivity= {
                    location: parseInt(locationId),
                    activity: activityObj.id
                }
                AddTripActivity(newTripActivity, parseInt(tripId)).then(
                    response => response.json()
                )
            .then(() =>{
                navigate(`/itinerary/${tripId}`)})
    })}
   
    return <>List of Activities via Location
    
    <div>{location.name}</div>
   
    
        { activities?.data?.map(activity => {
        return <>
        <div>
        {activity.name}
        <img className="rounded-full shadow-xl w-60 h-60" src={activity.pictures[0]} />
        <liv>
        {activity.description}</liv>
        <liv>{activity.price?.amount}</liv>
        <liv>{activity.minimumDuration}</liv>
        <liv>{activity.bookingLink}
        </liv>
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent, activity)}
             className="mb-4 mt-2 btn btn-lion btn-sm">
                Add Activity to Itinerary</button>
        </div>
        </>
    }) 
}
    </>
}