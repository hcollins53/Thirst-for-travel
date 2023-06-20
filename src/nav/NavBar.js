import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (<>
        <nav className="sticky top-0 z-10 bg-paleGray  max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
  <div className=" mx-auto flex justify-between items-center h-15 space-x-[950px]">
    <div className="flex items-center">
      <Link to="/planning">
        <div className="relative group flex items-center">
          <img src="https://img.icons8.com/ios/50/around-the-globe.png" alt="airplane-take-off" className="w-10 h-10 transition-opacity duration-300 group-hover:opacity-0" />
          <h1 className="absolute top-2 left-12 opacity-0 w-72 h-10 flex items-center font-body font-bold bg-paleGray text-maroonBrown text-3xl transition-opacity duration-300 group-hover:opacity-100">Thirst For Travel</h1>
        </div>
      </Link>
    </div>

    <div className="flex items-center">
      <div className="dropdown dropdown-hover justify-end bg-paleGray">
        <label tabIndex={0} className="m-1">
          <img className="h-8 w-10" src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/external-hamburger-basic-creatype-outline-colourcreatype-4.png" />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-26">
          <li>
            <Link className="font-title font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/budget">Budget</Link>
          </li>
          <li>
            <Link className="font-title font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/packing">Packing List</Link>
          </li>
          <li>
            <Link className="font-title font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/itineraries">My Itineraries</Link>
          </li>
          <li>
            <Link className="font-title font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/lodging">Lodging</Link>
          </li>
          <li>
            <Link className="font-title font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/transportation">Flights</Link>
          </li>
          <li>
            <Link className="font-title font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="" onClick={() => {
              localStorage.removeItem("travel_user");
              navigate("/", { replace: true });
            }}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>


        
        </>)
}

