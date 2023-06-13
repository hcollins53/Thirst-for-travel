// import { useRef, useState } from "react"
// import { GetFlightPrices } from "../provider/FlightProvider"

// export const FindFlight = () => {
//     const arr_airport = useRef()
//     const dep_airport = useRef()
//     const dep_date = useRef()
//     const flight_type = useRef()
//     const class_type = useRef()
//     const num_passengers = useRef()
//     const return_date = useRef()
//     const [flight, setFlight] = useState({})

//     const handleFlight = (e) => {
//         e.preventDefault()
//             GetFlightPrices(arr_airport, dep_date, flight_type, class_type, dep_airport, num_passengers, return_date )
//                 .then(data => {
//                     setFlight(data)
//                 })
        
//     }
//     return <>
//     <article>
//         <div>
//         <form className="" onSubmit={handleFlight}>
//                 <h1 className=" text-3xl item-center mb-4 border-b-2 border-gray-700">Enter Flight Information</h1>
//                 <fieldset>
//                     <label htmlFor="dep_airport"> Departure Airport Code </label>
//                     <input ref={dep_airport} type="text" name="dep_airport" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px]" placeholder="JFK, BNA, etc" required />
//                 </fieldset>
//                 <fieldset  className="form-group" >
//                     <label className="" htmlFor="arr_airport"> Arrival Airport Code </label>
//                     <input ref={arr_airport} type="text" name="arr_airport" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px]" placeholder="JFK, BNA, etc" required autoFocus /> 
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="dep_date"> Departure Date </label>
//                     <input ref={dep_date} type="text" name="dep_date" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px]" placeholder="YYYY-MM-DD" required />
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="return_date">Arrival Date</label>
//                     <input ref={return_date} type="text" name="return_date" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px]" placeholder="YYYY-MM-DD" required />
//                 </fieldset>
//                 <fieldset>
//                     <label htmlFor="num_passengers"> Number of Passengers </label>
//                     <input ref={num_passengers} type="text" name="num_passengers" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px]" placeholder="1, 2, 3" required />
//                 </fieldset>
//                 <fieldset>
//                 <label htmlFor="flight_type"> Flight Type </label>
//                  <select ref={flight_type}>
//                     <option value="ONE_WAY">One way</option>
//                     <option value="ROUND_TRIP">Round trip</option>
//                     </select>   
//                 </fieldset>
//                 <fieldset>
//                 <label htmlFor="class_type"> Class Type </label>
//                  <select ref={class_type}>
//                     <option value="ECO">economy</option>
//                     <option value="BUS">business class</option>
//                     <option value="PEC">premium economy</option>
//                     <option value="FST">first class</option>
//                     </select>   
//                 </fieldset>
//                 <fieldset>
//                     <button className="btn btn-justColor font-light btn-sm" type="submit"> Register </button>
//                 </fieldset>
//             </form>
//         </div>
//     </article>
//     </>
// }