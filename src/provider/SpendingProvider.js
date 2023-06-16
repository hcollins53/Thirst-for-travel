const localUser = localStorage.getItem("travel_user")
const user = JSON.parse(localUser)


export const AddNewBudget = (newBudget) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/budgets`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             "Accept": "application/json",
            "Authorization": `Token ${token}`
         },
        body: JSON.stringify(newBudget) 
     })
}

export const getBudgetByTripId = (tripId) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/budgets?trip=${tripId}`, {
        headers: {
            "Accept": "application/json",
           "Authorization": `Token ${token}`
        }
    })
            .then(res => res.json())
}
export const AddNewExpense = (newSpending) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/spendings`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             "Accept": "application/json",
            "Authorization": `Token ${token}`
         },
        body: JSON.stringify(newSpending) 
     })
}

export const getSpendingByBudgetId = (budgetId) => {
    const token = user["token"]
    return fetch(`http://localhost:8000/spendings?budget=${budgetId}`, {
        headers: {
            "Accept": "application/json",
           "Authorization": `Token ${token}`
        }
    })
            .then(res => res.json())
}