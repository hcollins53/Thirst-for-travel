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
    return <>
    <div className="bg-darkGray h-screen">
    <div className="text-paleGray text-3xl text-center pt-10">Explore Hotels and other Lodging</div>
    <select className="ml-4" onClick={(evt) => GrabTrip(evt)}>
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
     </select> : <div className="flex flex-wrap justify-end w-1/2 ml-96">
        <div className="m-1"> <img className="w-72 rounded-full" src="https://media1.dallasobserver.com/dal/imager/u/magnum/13585964/hobbit_house-credit-jessica-serna.jpg?cb=1653512046"/> </div>
        <div className="m-1"><img className="w-56 m-1 rounded-full" src="https://www.territorysupply.com/wp-content/uploads/2021/11/Unique-Places-to-Stay-in-Colorado-min.jpg"/></div>
        <div className="m-1"><img className="w-56 mt-2 rounded-full" src="https://media.cntraveler.com/photos/61a60b14e663d9fce4b711c1/1:1/w_800,h_801,c_limit/Airbnb%2039271504.jpg"/></div>
        <div className="m-1"><img className="w-72 rounded-full" src="https://www.atastefortravel.ca/wp-content/uploads/2018/05/Aruba-Ocean-Villas-Credit-Stivin-Sanchez-Photography.jpg"/></div>

     </div>
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
</div>
    </>
}