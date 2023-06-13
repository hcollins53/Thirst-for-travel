import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { GetGeoCodes, getLocationById } from "../itinerary/TripProvider"
import { getTripById, getUserTrips } from "../itinerary/TripProvider"
import { AddNewLodging, getHotelListByLocation, getLodgingByName } from "../provider/HotelProvider"


export const HotelList = () => {
    const navigate = useNavigate()
    const [location, setLocation] = useState({})
    const[trip, setTrip] = useState({})
    const[locationId, setlocationId] = useState("")
    const [tripId, setTripId] = useState("")
    const [trips, setTrips] = useState([])
    const [geoCode, setGeoCode] = useState({})
    const [hotels, setHotel] = useState([])
    const[lat, setLat] = useState("")
    const[lng, setLng] = useState("")
    useEffect(()=> {
        getUserTrips().then((data)=> {
            setTrips(data)
        })
    },[])
    useEffect(() => {
      if(tripId) { 
        getTripById(tripId).then((data)=> {
            setTrip(data)
            })}
    },[tripId])
    useEffect(() => {
        if(locationId) { 
          getLocationById(locationId).then((data)=> {
              setLocation(data)
              })}
      },[locationId])
    const GrabTrip = (evt) => {
        evt.preventDefault()
        setTripId(evt.target.value)
        
    }
    const GrabLocation = (evt) => {
        evt.preventDefault()
        setlocationId(evt.target.value)
    }
    useEffect(() => {
        if(location.name){
        GetGeoCodes(location.name).then((data)=> {
            setGeoCode(data)
        })
        
    }}, [location])
    useEffect(() => {
        if(geoCode.hits){
        const lat = geoCode?.hits[0]?.point?.lat
        const lng = geoCode?.hits[0]?.point?.lng
        setLat(lat)
        setLng(lng)
        getHotelListByLocation(lat, lng).then((data)=> {
                    setHotel(data)
                })}
        
    }, [geoCode])
    const handleSaveButtonClick = (event, hotel) => {
        event.preventDefault()

        const newLodging= {
            name: hotel.name,
            location: location.id,
            place_id: hotel.place_id,
            rating: hotel.rating,
            vicinity: hotel.vicinity,
            lat: hotel?.geometry?.location?.lat,
            lng: hotel?.geometry?.location?.lng
        }

       AddNewLodging(newLodging).then(
            response => response.json())
            .then(() => {
                getLodgingByName(hotel.name).then((data) =>{
                    const singleHotel = data[0]
                    setHotel(singleHotel)
                })
               
    })}
    const CheckIfLocationIsThere = () => {
       
    }
    return <>List of Hotels via Location
    <div>Which Trip do you want view lodging for?</div>
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
    {
        trip.name ?
         <select onClick={(evt) => GrabLocation(evt)}>
      <option name= "trip">Choose a Location</option>
 
         {
         trip.locations.map((trip) => {
         return (
             <option 
                 value={trip.location}> {trip.location_name}</option> 
         )})
         }
     </select> : ""
    }
    {
        trips.locations && trip.name ? <div>Go back and add a location to your trip</div> : ""
    }
    <div>{location.name}</div>
   
    
        { hotels?.results?.map(hotel => {
        return <>
        <div>
        <Link to={`/hotelDetails/${hotel.place_id}/${lat}/${lng}`}> {hotel.name} </Link>
        {/* <img className="rounded-full shadow-xl w-60 h-60" src={hotel.pictures[0]} /> */}
        <div>
        {hotel.rating}</div>
        <div>{hotel.vicinity}</div>
        <div>{hotel?.types[0]}</div>
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent, hotel)}
             className="mb-4 mt-2 btn btn-lion btn-sm">
                Add hotel to Itinerary</button>
        </div>
        </>
        })}

    </>
}