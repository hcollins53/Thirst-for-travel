import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="font-body bg-lion flex row justify-evenly">
            <li>
               <Link to="/packing"> Packing List</Link>
            </li>
            <li>
                My Itineraries
            </li>
            <li>
                Lodging
            </li>
            <li>
                Flights
            </li>
             <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("travel_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
        </ul>
    )
}

//add links to navbar items- explore-list of top tens of the place you want to go
//my itinerary- goes to the full list you've made
//community- reddit posts from r/travel?