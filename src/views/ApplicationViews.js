import { Outlet, Route, Routes } from "react-router-dom"
import { AddingToTheItinerary } from "../itinerary/Itinerary"
import { PlanATrip } from "../itinerary/Planning"


export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
                 
            }>
              <Route path="/planning" element={<PlanATrip />} />
              <Route path="/itinerary" element={<AddingToTheItinerary />} />
            </Route>
        </Routes>
    )
}