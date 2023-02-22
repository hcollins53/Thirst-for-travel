import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { PlanATrip } from "../itinerary/Planning"
import { ThirstForTravel } from "../ThirstForTravel"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="font-body font-bold text-xl">Thirst for Travel</h1>
                    <div className="font-body text-lg">Make the itinerary of your dreams</div>
                    <Outlet />
                </>
                 
            }>
              <Route path="/planning" element={<PlanATrip />} />

            </Route>
        </Routes>
    )
}