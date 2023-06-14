
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { NavBar } from './nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
import { Authorized } from './views/Authorized';
import { ThirstForTravel } from './ThirstForTravel';
import { SideBar } from './nav/SideBar';

//import { ThirstForTravel } from './ThirstForTravel';


function App() {
   const setToken = (auth_token, user_id) => {
		let token = {
			"token": auth_token,
			"userId": user_id
		}
		localStorage.setItem('travel_user', JSON.stringify(token))
	  }
  return <>
   <Routes>
      <Route path="/" element={<ThirstForTravel />} />
      <Route path="/login" element={<Login setToken={setToken}/>} />
		  <Route path="/register" element={<Register setToken={setToken}/>} />  
		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					{/* <SideBar /> */}
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
   </>
}

export default App;

/*
  <button onClick={() => navigate("/frontpage/*")}>Start Planning</button>
   <Routes>
   <Route path='/frontpage/*' element={<ThirstForTravel />}/>
   </Routes>
*/