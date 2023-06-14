import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (<>
        <nav className="sticky top-0 z-10 bg-paleGray backdrop-filter backdrop-blur-lg  border-b border-gray-200">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-center h-16">
      <div className="flex space-x-10 text-gray-900">
               <Link to="/packing"> Packing List</Link>
               <Link to="/itineraries"> My Itineraries </Link>
               <Link to="/planning"> <span className="text-3xl text-maroonBrown font-body">Thirst For Travel</span> </Link>
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