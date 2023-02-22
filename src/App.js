
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { NavBar } from './nav/NavBar';
import { ApplicationViews } from './views/ApplicationVews';
import { Authorized } from './views/Authorized';

//import { ThirstForTravel } from './ThirstForTravel';


function App() {
  const navigate = useNavigate()
  return <>
   <h1 className='title'>Thirst for Travel</h1>
   <Routes>
        <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Register />} />  
		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
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