import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet/src/layer/marker/Icon'
import { getHotelDetails } from "../provider/HotelProvider"

export const MapMarker = (lat, lng, hotel) => {
     return <>
     
     <Marker  position={[lat, lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
       <Popup className="font-title">
       <div> {hotel?.result?.name} </div>
       </Popup>
       </Marker>
     
       </>     
   }
export const HotelDetails = () => {
    const {placeId, lat, lng } = useParams()
    const [hotel, setHotel] = useState({})

    useEffect(()=> {
        getHotelDetails(placeId).then((data) => {
            setHotel(data)
        })
    }, [placeId])
    function MyMapComponent(lat, lng) {
        return (
            <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
       MapMarker(lat, lng, hotel)
     }
    
    </MapContainer>
        )
}
    return <>
    <article className="bg-midnightBlue font-title font-bold">
        <div className="text-paleGray p-2">
        <div className="text-2x font-bold mx-auto flex justify-center">{hotel?.result?.name}</div>
        <div className="mx-auto flex justify-center">{hotel?.result?.editorial_summary?.overview}</div>
        <div className="mx-auto flex justify-center">{hotel?.result?.formatted_address}</div>
        <div className="mx-auto flex justify-center">{hotel?.result?.formatted_phone_number}</div>
        </div>
        <div className="flex flex-row">
        <div className="ml-4 overflow-auto overflow-y-scroll overflow-hidden h-screen">
            {hotel?.result?.reviews?.map(review => {
               return<>
               <div className="bg-midnightBlue text-paleGray mb-4 w-[350px] flex flex-col mx-auto text-center">
               <div>{review.text}</div>
               <div>reviewed by: {review.author_name}</div>
               <div>rating: {review.rating}</div>
               <div>written: {review.relative_time_description}</div>
               </div>
               </>
            })}

        </div>
        <div>
            {hotel?.result?.wheelchair_accessible_entrance}
        </div>
        
        
        <section id="map" className="w-1/3 h-full">
        {
            MyMapComponent(lat, lng)
        }
        <div>
        <a href={`${hotel?.result?.url}`} className="underline" target="_blank">Click here to view on Google Maps</a>
        </div>
    </section>
    </div>
    </article>
    </>
}