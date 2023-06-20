import { useEffect, useRef, useState } from "react"
import { AddNewLocation, AddTripLocation, GetGeoCodes, getHotelsByTrip, getLocationByName, getTripById } from "./TripProvider"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DeleteTripActivity, getActivitiesFromTrip } from "../provider/ActivityProvider"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useMap} from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet/src/layer/marker/Icon'
import Sortable from 'sortablejs';


export const MapMarker = (activities, hotels) => {
     return <>
     
     {activities.map(activity => {
     return<>
     
     <Marker  position={[activity.lat,activity?.lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
       <Popup className="font-title">
       <div> {activity?.name} </div>
       </Popup>
       </Marker>
     
           </>     })}
           {hotels.map(hotel => {
     return<>
     
     <Marker  position={[hotel.lat,hotel?.lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
       <Popup className="font-title">
       <div> {hotel?.name} </div>
       </Popup>
       </Marker>
     
           </>     })}
           </>
   }

export const AddingToTheItinerary = () => {
    const { tripId } = useParams()
    const [trip, setTrip] = useState({})
    const [tripLocation, setTripLocation] = useState({})
    const [activities, setActivities] = useState([])
    const [geoCode, setGeoCode] = useState({})
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [hotels, setHotels] = useState([])
    const dragItem = useRef()
    const dragOverItem = useRef();
    const dragStart = (e, position) => {
      dragItem.current = position;
      console.log(e.target.innerHTML);
    };
    const dragEnter = (e, position) => {
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
    };
    const drop = (e) => {
      const copyListItems = [...activities];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setActivities(copyListItems);
    };
    useEffect(() => {
      const activitiesList = document.getElementById("activitiesList");
      const sortable = Sortable.create(activitiesList);
  
      return () => {
        // Clean up the sortable instance when the component unmounts
        sortable.destroy();
      };
    }, []);
    useEffect(
        () => {
           getTripAndActivities()
           },[])
    const getTripAndActivities = () => {
        getTripById(parseInt(tripId))
             .then((data) => {
                setTrip(data)
             }).then(() => {
                getActivities()
             })
            }
    useEffect(() => {
      if(trip.locations?.length > 0){
      GetGeoCodes(trip?.locations[0]?.location_name).then((data)=> {
        setGeoCode(data)})} 
    }, [trip])
    useEffect(() => {
      if(geoCode.hits){
      const lat = geoCode?.hits[0]?.point?.lat
      const lng = geoCode?.hits[0]?.point?.lng
      setLat(lat)
      setLng(lng)
              }
      
  }, [geoCode])
  // useEffect(() => {
  //   debugger
  //   MyMapComponent(lat, lng)
  // },[selectedActivity])
    useEffect(() => {
        if(tripLocation.name){
        AddNewTripLocation()}
    }, [tripLocation])
    const getActivities = () => {
        getActivitiesFromTrip(parseInt(tripId)).then((data) => {setActivities(data)})
        getHotelsByTrip(parseInt(tripId)).then((data) => {setHotels(data)} )
    }
    
    const [location, updateLocation] = useState({
        name: ""
    })

    //const navigate = useNavigate()
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
                updateLocation({})
                setTripLocation({})
    })}
    const AddNewTripLocation = () => {
            const newTripLocation= {
                location: tripLocation.id
            }
            AddTripLocation(newTripLocation, parseInt(tripId)).then(
                response => response.json()
            )
        .then(() =>{
            getTripAndActivities()
            setTripLocation({})
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
    const handleChangeLat = ( evt, activity) => {
      evt.preventDefault()
      setLat(activity.lat)
      setLng(activity.lng)
    }
    function MyMapComponent({map, lat, lng, activities, hotels}) {
    
      useEffect(() => {
        if (lat && lng) {
          map.flyTo([lat, lng], 12, {
            duration: 1.5,
            easeLinearity: 0.25,
          });
        }
      }, [lat, lng]);
        return <>
          <TileLayer  
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
       MapMarker(activities, hotels)
     }
    

        </>
    } 
    function MapWrapper() {
      const map = useMap()
      return<>
        <MyMapComponent map={map} lat={lat} lng={lng} activities={activities} hotels={hotels} />
        </>
    }
    return <>
      <article className="text-center font-title bg-paleGray">
    <h2 className="text-2xl pt-3 font-bold text-midnightBlue">Trip To {trip?.name}</h2>
    <p> 🗓️{trip?.start_date}-{trip?.end_date} </p>
    <div class="bg-paleGray p-4 rounded-lg">
    <div class="relative flex ml-10 bg-paleGray">
        <input type="text" id="location" name="location" className="peer bg-transparent h-10 w-72 rounded-lg text-gray-600 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="city, state"
        value = {location.name} 
        onChange={
            (evt) => {
                const copy = {...location}
                copy.name = evt.target.value
                updateLocation(copy)
            }
        }/>
        <label for="location" className=" absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Where do you want to go?</label>
        <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mb-4 mt-2 ml-2 btn bg-dustyRose btn-sm">
                Add
            </button>
    </div>
    </div>
    <div>
    <div className=" flex flex-row justify-between">
    <div className="overflow-auto overflow-y-scroll w-1/2 overflow-hidden h-screen">
  {
    trip?.locations?.map(location => {
      const filteredActivities = activities.filter(activity => {
        return activity?.location?.id === location.location
      })
      const filteredHotels = hotels.filter(hotel => {return hotel?.location?.id === location.location})
      return (
        <div className="font-title" draggable="true" key={location.id}>
          <Link className="text-xl font-bold underline" to={`/locations/${location.location}/trip/${tripId}`}>
            {location.location_name}
          </Link>
          <div>{ filteredHotels.map(hotel => {
           return <div className="mr-2" draggable="true"> <button onClick={(clickEvent) => handleChangeLat(clickEvent, hotel)}>{hotel.name}</button></div>

    })
    }
          </div>
          {
            filteredActivities.map((activity, index) => (
              <div onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)}  onDragEnd={drop} className="flex justify-center" draggable="true" key={activity.id}>
               <div className="mr-2"> <button onClick={(clickEvent) => handleChangeLat(clickEvent, activity)}>{activity.name}</button></div><div className="">
                  <button className="btn-sm btn-circle font-light" onClick={(clickEvent) => handleDelete(clickEvent, activity, location)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
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
   <section id="map" className="justify-end w-full h-full z-0">
        {
        lat & lng ?  <MapContainer center={[lat, lng]} zoom={200} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={20}
        />
        <MapWrapper />
      </MapContainer> :""
        }
    </section>
   
    </div>
</div>
</article>
   </>
}
