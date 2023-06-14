import React, { useEffect, useState } from "react"
import { getUserTrips } from "./TripProvider"
import { Link } from "react-router-dom"

export const Itineraries = () => {
    const [itineraries, setItineraries] = useState([]);
  
    useEffect(() => {
      getUserTrips().then((data) => {
        setItineraries(data);
      });
    }, []);
  
    const changeGridSize = (index) => {
      if ((index + 1) % 2 === 0) {
        return { width: "200px", height: "300px" };
      } else {
        return { width: "175px", height: "200px" };
      }
    };
  
    const changeGrid = (index) => {
      if ((index + 1) % 2 === 0) {
        return "grid-cols-2 md:grid-cols-2 lg:grid-cols-3";
    } else {
      return "grid-cols-1";
      }
    };
  
    const changeImageSize = (index) => {
      if ((index + 1) % 2 === 0) {
        return "h-[300px] w-[200px] rounded-lg";
      } else {
        return "h-[200px] w-[175px] rounded-lg";
      }
    };
  
  
    const renderGridItems = () => {
      return itineraries.map((itinerary, index) => (
        <div className="relative">
             <a class="absolute inset-0 z-10 bg-white text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
             <Link to={`/itinerary/${itinerary.id}`}> <h1  className="tracking-wider" >{itinerary.name}</h1></Link>
      </a>
      <div className="relative">
        <div
          className={`ml-2 mb-2 ${changeGrid(index)}`}
          key={itinerary.id}
          style={changeGridSize(index)}
        >
          <Link to={`/itinerary/${itinerary.id}`}>
            <img
              className={changeImageSize(index)}
              src={itinerary.image}
              alt=""
            />
          </Link>
        </div>
        </div>
        </div>
      ));
    };
  
    return (
      <>
        {/* <h1>My Itineraries</h1> */}
        <div className="bg-tan h-screen">
        <div className="flex flex-wrap px-32 items-center justify-center pt-10">{renderGridItems()}</div>
        <Link className="btn ml" to="/planning">
          Plan a new trip
        </Link>
        </div>
      </>
    );
  };