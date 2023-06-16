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
    const [screen, setScreen] = useState("")
    useEffect(()=> {
        getUserTrips().then((data)=> {
            setTrips(data)
            setScreen("screen")
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
                    if(data?.results?.length > 4) {
                        setScreen("full")
                    } else {
                        setScreen("screen")
                    }
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
            lng: hotel?.geometry?.location?.lng,
            trip: parseInt(tripId)
        }

       AddNewLodging(newLodging).then(
            response => response.json())
            .then(() => {
                navigate(`/itinerary/${tripId}`)
                })
    }
    const ChangeMargin = (index) => {
        if ((index + 1) % 2 === 0) {
            return "ml-64";
          } else {
            return "m-2";
          }
    }
    return <>
    <div className={`bg-darkGray h-${screen}`}>
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
     </select> : ""
    }
    {
        (trips.length > 1 && trip?.locations?.length === 0) ? <div className="text-paleGray">
        <Link to={`/itinerary/${tripId}`}>Click here to add a location to your trip</Link></div> : ""
    }
    <div className="flex">
    <div className="w-1/2">
    <div className="text-paleGray mx-auto text-center text-3xl m-2">{location.name}</div>
   <div className="overflow-auto overflow-y-scroll overflow-hidden h-1/6">
    
        { hotels?.results?.map((hotel, index) => {
        return <>
        <div className={`text-darkGray rounded-lg border-midnightBlue shadow-lg border-2 bg-anotherBeige text-center w-[300px] p-2 ${ChangeMargin(index)}`}>
        <Link to={`/hotelDetails/${hotel.place_id}/${lat}/${lng}`}> {hotel.name} </Link>
        {/* <img className="rounded-full shadow-xl w-60 h-60" src={hotel.pictures[0]} /> */}
        <div>
        {hotel.rating}</div>
        <div>{hotel.vicinity}</div>
        <div>{hotel?.types[0]}</div>
        <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent, hotel)}
             className="mb-4 mt-2 btn btn btn-sm">
                Add hotel to Itinerary</button>
        </div>
       
        </>
        })}
        </div>
        </div>
        <div className="px-5 py-2 w-1/2 ">
            <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex flex-wrap justify-center">
        <div className="w-1/2 p-1 md:p-2"> <img className="block h-full w-full rounded-lg object-cover object-center" src="https://media1.dallasobserver.com/dal/imager/u/magnum/13585964/hobbit_house-credit-jessica-serna.jpg?cb=1653512046"/> </div>
        <div className="w-1/3 p-1 md:p-2"><img className="block h-full w-full rounded-lg object-cover object-center" src="https://www.territorysupply.com/wp-content/uploads/2021/11/Unique-Places-to-Stay-in-Colorado-min.jpg"/></div>
        <div className="w-1/3 p-1 md:p-2"><img className="block h-full w-full rounded-lg object-cover object-center" src="https://media.cntraveler.com/photos/61a60b14e663d9fce4b711c1/1:1/w_800,h_801,c_limit/Airbnb%2039271504.jpg"/></div>
        <div className="w-1/2"><img className="block h-full w-full rounded-lg object-cover object-center" src="https://www.atastefortravel.ca/wp-content/uploads/2018/05/Aruba-Ocean-Villas-Credit-Stivin-Sanchez-Photography.jpg"/></div>
        {/* <div className="flex flex-wrap"> */}
        <div className="w-1/2 p-1 md:p-2"><img className="block h-full w-full rounded-lg object-cover object-center" src="https://www.lupaia.com/assets/uploads/lupaia-1/lupaia-569.jpg"/></div>
        <div className="w-1/3 h-1/4 p-1 md:p-2"><img className="block h-full w-full rounded-lg object-cover object-center" src="https://www.i-escape.com/gallery/161001_162000/161601_161700/161648_467x300.jpg"/></div>
        {/* </div> */}
        </div>
        </div>
        </div>
        </div>
    </div>     
    </>
}