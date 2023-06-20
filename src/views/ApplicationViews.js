import { Outlet, Route, Routes } from "react-router-dom"
import { AddingToTheItinerary } from "../itinerary/Itinerary"
import { PlanATrip } from "../itinerary/Planning"
import { LocationActivities } from "../itinerary/LocationActivities"
import { ActivityDetails } from "../itinerary/ActivityDetails"
import { PackingList } from "../packing/PackingList"
import { HotelList } from "../lodging/hotelList"
import { Itineraries } from "../itinerary/ItineraryList"
import { TransportationList } from "../flight/Transportation"
import { FindFlight } from "../flight/Flight"
import { TransportForm } from "../flight/TransportForm"
import { HotelDetails } from "../lodging/hotelDetails"
import { Budget } from "../budget/BudgetList"
import { FoodList } from "../itinerary/FoodList"


export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
                 
            }>
              <Route path="planning" element={<PlanATrip />} />
              <Route path="/itinerary/:tripId" element={<AddingToTheItinerary />} />
              <Route path="/locations/:locationId/trip/:tripId" element={<LocationActivities />} />
              <Route path="/activityDetail/:placeId/:lat/:lng" element={<ActivityDetails />} />
              <Route path="/packing" element={<PackingList />} />
              <Route path="/lodging" element={<HotelList />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path="/flights" element={<FindFlight />} />
              <Route path="/transportation" element={<TransportationList />} />
              <Route path="/transportForm/:tripId" element={<TransportForm />} />
              <Route path="/hotelDetails/:placeId/:lat/:lng" element={<HotelDetails />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/food/:locationId/:tripId" element={<FoodList />} />
            </Route>
        </Routes>
    )
}