import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (<>
        <nav className="sticky top-0 z-10 bg-white  backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <span className="text-2xl text-gray-900 font-semibold">Thirst For Travel</span>
      <div className="flex space-x-4 text-gray-900">
               <Link to="/packing"> Packing List</Link>
               <Link to="/itineraries"> My Itineraries </Link>
               <Link to="/lodging"> Lodging</Link> 
               <Link to='/transportation'>Flights</Link> 
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("travel_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    
        </div>
        </div>
        </div>
        </nav>
        
        </>)
}

//add links to navbar items- explore-list of top tens of the place you want to go
//my itinerary- goes to the full list you've made
//community- reddit posts from r/travel?