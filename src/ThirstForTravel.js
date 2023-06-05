

import { useNavigate } from 'react-router-dom';

export const ThirstForTravel = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
    <article className='front h-screen'>
    <div className='flex justify-center flex-col'>
      <div className="mx-auto mt-52 mb-10 text-xl  bg-slate-200 p-4 rounded-lg ">Discover the World and Awaken Your Thirst for Travel: Create the Itinerary of Your Dreams!</div>
      <button className=" bg-slate-200 p-4 rounded-lg w-[300px] mx-auto" onClick={handleLoginClick}>Start Planning Today!</button>
      </div>
      </article>
    </>
  );
};

  