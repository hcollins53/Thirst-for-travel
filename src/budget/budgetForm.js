import { useNavigate } from "react-router-dom"
import { AddNewBudget } from "../provider/SpendingProvider"
import { useState } from "react"

export const BudgetForm = ({tripId, reGetBudget}) => {
    const navigate = useNavigate()

    const [budget, update] = useState({
        trip: 0,
        amount: 0
    })
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newBudget= {
            trip: parseInt(tripId),
            amount: budget.amount
        }
       AddNewBudget(newBudget)
            .then(() => {
               reGetBudget()
            }) 
    }
    return <>
    <article className="font-title h-full w-full bg-paleGray"> 
    <form className="">
            <h2 className="text-2xl pt-4 pb-4 text-center font-bold">What is your budget?</h2>
            <div className="border-2 border-black shadow-xl rounded-xl mx-auto p-4 bg-silver text-center w-[500px]">
            <fieldset className="mb-2">
                <div className="form-group flex justify-center flex-col">
                    <label className="">Amount your budgeting to spend</label>
                    <input
                        required autoFocus
                        type="number"
                        placeholder=""
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={budget.amount}
                        onChange={
                            (evt) => {
                                const copy = {...budget}
                                copy.amount = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
           
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn bg-dustyRose mt-2 font-light">
                Submit Your Budget
            </button>
            </div>
        </form>
    </article>
    </>
}