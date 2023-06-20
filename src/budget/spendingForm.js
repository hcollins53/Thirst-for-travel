import { useNavigate } from "react-router-dom"
import { AddNewBudget, AddNewExpense } from "../provider/SpendingProvider"
import { useState } from "react"

export const SpendingForm = ({budgetId, reGetBudget, getSpending}) => {
    const navigate = useNavigate()

    const [expense, update] = useState({
        budget: 0,
        amount: 0,
        expense: ""
    })
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newSpending= {
            budget: parseInt(budgetId),
            amount: expense.amount,
            expense: expense.expense
        }
       AddNewExpense(newSpending)
            .then(() => {
               update({})
               reGetBudget()
               getSpending()
            }) 
    }
    return <>
    <article className="font-title h-full w-full bg-paleGray"> 
    <form className="">
            <h2 className="text-2xl pt-4 pb-4 text-center font-bold">Add a new expense</h2>
            <div className="border-2 border-black shadow-xl rounded-xl mx-auto p-4 bg-silver text-center w-[500px]">
            <fieldset className="mb-2">
                <div className="form-group flex justify-center flex-col">
                    <label className="">Type of expense</label>
                    <input
                        required autoFocus
                        type="text"
                        placeholder=""
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={expense.expense}
                        onChange={
                            (evt) => {
                                const copy = {...expense}
                                copy.expense = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="mb-2">
                <div className="form-group flex justify-center flex-col">
                    <label className="">Amount you spent</label>
                    <input
                        required autoFocus
                        type="number"
                        placeholder=""
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                        value={expense.amount}
                        onChange={
                            (evt) => {
                                const copy = {...expense}
                                copy.amount = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn bg-dustyRose mt-2 font-light">
                Add Expense
            </button>
            </div>
        </form>
    </article>
    </>
}