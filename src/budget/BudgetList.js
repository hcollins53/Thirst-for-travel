import { useEffect, useState } from "react"
import { getBudgetByTripId, getSpendingByBudgetId } from "../provider/SpendingProvider"
import { getTripById, getUserTrips } from "../itinerary/TripProvider"
import { BudgetForm } from "./budgetForm"
import { SpendingForm } from "./spendingForm"

export const Budget = () => {
        const [tripId, setTripId] = useState("")
        const [trips, setTrips] = useState([])
        const [budget, setBudget] = useState({})
        const [expenses, setExpenses] = useState([])
        const [trip, setTrip] = useState({})
        useEffect(()=> {
            getUserTrips().then((data)=> {
                setTrips(data)
            })
        },[])
        useEffect(() => {
          if(tripId) { 
            getTripById(tripId).then((data) => {
                setTrip(data)})
            getBudgetByTripId(tripId).then((data) => {
                const singleBudget = data[0]
                setBudget(singleBudget)
            })
            }},[tripId])
        useEffect(() => {
            if(budget?.amount) {
                getSpendingByBudgetId(budget.id).then((data) => {
                    setExpenses(data)
                })
            }
        },[budget])
        const GrabTrip = (evt) => {
            evt.preventDefault()
            setTripId(evt.target.value)
        }
        return <>
        {/* <div className="border-b-2 border-midnightBlue shadow-md">
            <img src="https://www.nec.com/en/global/solutions/transportation/images/transportation_header_pc.jpg"/>
        </div> */}
        <article className="mx-auto flex items center justify-center flex-col">
        <div className="text-center mt-6 text-2xl text-maroonBrown">Budget for {trip?.name}</div>
        <select className="w-56 rounded-lg mx-auto m-4" onClick={(evt) => GrabTrip(evt)}>
         <option name= "trip">Choose a Trip</option>
    
            {
            trips.map((trip) => {
            return (
                <option 
                    value={trip.id}> {trip.name}</option> 
            )})
            }
        </select>
        <div className="mb-2">
           { trip.name && !budget ? <label htmlFor="my-modal-3" className="btn bg-dustyRose w-52 flex justify-center mx-auto">Add a budget for your trip</label> : ""}
            </div>
        <div className="overflow-x-auto mx-auto">
            <table className="table border-collapse border border-darkGray rounded-lg">
            <thead>
          <tr>
            <th></th>
            <th>Expense</th>
            <th>Cost</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
            {
                expenses.length > 0 ?  expenses.map(expense => {
                    let total = 0
                    return <> <tr>
                    <th></th>
                    <td className="">{expense.expense}</td>
                    <td>{expense.amount}</td>
                    <td>{total += expense.amount}</td>
                    
                  </tr></>
                }): ""
            }
    </tbody>
    </table>
        </div>
        <div className="mb-2">
           { trip?.name && budget?.amount ? <label htmlFor="my-modal-1" className="btn mt-4 bg-dustyRose w-32 flex justify-center mx-auto">Add an expense</label> : ""}
            </div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal backdrop-blur-sm">
      <div className="modal-box relative justify-between flex flex-row bg-silver w-6/12 max-w-5xl">
        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div className="flex justify-evenly">
            <div className=" p-4 shadow-lg">
            <div className="flex flex-col">
                <div>{ 
                <BudgetForm tripId={tripId} />
    }
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            <div className="modal backdrop-blur-sm">
      <div className="modal-box relative justify-between flex flex-row bg-silver w-6/12 max-w-5xl">
        <label htmlFor="my-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div className="flex justify-evenly">
            <div className=" p-4 shadow-lg">
            <div className="flex flex-col">
                <div>{ 
                <SpendingForm budgetId={budget.id} />}
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </article>
        
        </>
    }

    //add a chart or graph for budget? amount spent of total
    //total is not adding
    //re-rendering the page when a spending as been added 