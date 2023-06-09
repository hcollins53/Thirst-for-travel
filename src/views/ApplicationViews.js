import { Outlet, Route, Routes } from "react-router-dom"
import { AddingToTheItinerary } from "../itinerary/Itinerary"
import { PlanATrip } from "../itinerary/Planning"
import { LocationActivities } from "../itinerary/LocationActivities"
import { ActivityDetails } from "../itinerary/ActivityDetails"
import { PackingList } from "../packing/PackingList"


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
            </Route>
        </Routes>
    )
}