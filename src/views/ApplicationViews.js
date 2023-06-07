import { Outlet, Route, Routes } from "react-router-dom"
import { AddingToTheItinerary } from "../itinerary/Itinerary"
import { PlanATrip } from "../itinerary/Planning"
import { LocationActivities } from "../itinerary/LocationActivities"


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
            </Route>
        </Routes>
    )
}