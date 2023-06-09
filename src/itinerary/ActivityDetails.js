import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getActivityDetails } from "../provider/ActivityProvider"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet/src/layer/marker/Icon'

export const MapMarker = (lat, lng, activity) => {
     return <>
     
     <Marker  position={[lat, lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
       <Popup className="font-title">
       <div> {activity?.result?.name} </div>
       </Popup>
       </Marker>
     
       </>     
   }
export const ActivityDetails = () => {
    const {placeId, lat, lng } = useParams()
    const [activity, setActivity] = useState({})

    useEffect(()=> {
        getActivityDetails(placeId).then((data) => {
            setActivity(data)
        })
    }, [placeId])
    function MyMapComponent(lat, lng) {
        return (
            <MapContainer center={[lat, lng]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
       MapMarker(lat, lng, activity)
     }
    
    </MapContainer>
        )
}
    return <>
    <article>
    
        <div className="text-2xl font-bold mx-auto flex justify-center">{activity?.result?.name}</div>
        <div className="flex flex-row">
        <div>
            {activity?.result?.reviews.map(review => {
               return<>
               <div className="border-2 w-[500px] mb-4 flex flex-col items-center">
               <div>{review.text}</div>
               <div>reviewed by: {review.author_name}</div>
               <div>rating: {review.rating}</div>
               <div>written: {review.relative_time_description}</div>
               </div>
               </>
            })}

        </div>
        <div>
            {activity?.result?.wheelchair_accessible_entrance}
        </div>
        
        
        <section id="map" className="">
        {
            MyMapComponent(lat, lng)
        }
        <div>
        <a href={`${activity?.result?.url}`} className="underline" target="_blank">Click here to view on Google Maps</a>
        </div>
    </section>
    </div>
    </article>
    </>
}