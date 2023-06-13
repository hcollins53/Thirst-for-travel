const google_key = process.env.REACT_APP_GOOGLE_KEY
const localUser = localStorage.getItem("travel_user")
const user = JSON.parse(localUser)

export const GetFlightPrices = (arr_airport, dep_date, flight_type, class_type, dep_airport, num_passengers, return_date) => {
    fetch(`https://priceline-com-provider.p.rapidapi.com/community/v1/flights/search?location_arrival=${arr_airport}&sort_order=PRICE&date_departure=${dep_date}&itinerary_type=${flight_type}&class_type=${class_type}&location_departure=${dep_airport}&number_of_stops=1&price_max=20000&number_of_passengers=${num_passengers}&duration_max=2051&price_min=10&date_departure_return=${return_date}`, {
        headers: {
           'X-RapidAPI-Key': '633f5b03ddmshe0d1e8c5dd7be14p12e4b2jsnbb1b6270baf3',
           'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
    })
}