import { useState } from "react";
import { HomeIcon, CalendarIcon, CursorArrowRippleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import Navbar from "../components/Navbar";
import {  Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  userlogout } from "../redux/actions/UserActions";
import { useSelector, useDispatch } from "react-redux";
import UserList from "../components/UserList";

const Users = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


const logoutt=()=>{
  dispatch(userlogout())
  toast("Logout Successfully")
  navigate("/Login");

  console.log("Hi logout")
}

const { User ,loading } = useSelector((state) => state.User);

    console.log(User.role,"BBBBB")
  return (
    <div className="flex">
      <div
        className={` ${open ? "w-60" : "w-20 "
          } bg-blue-100 h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="./control.png"
          alt=""
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            alt=""
            src="./logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            HealthCare
          </h1>
        </div>
        <ul className="pt-6">
          <li
            className={`flex  rounded-md p-2 my-1 cursor-pointer hover:bg-light-white text-blue-500 font-medium opacity-70 hover:scale-105 text-sm items-center gap-x-4 
              `}
          >
            <HomeIcon className="h-6 w-6 text-blue-400" />

            <span className={`${!open && "hidden"} origin-left duration-200`}>
            <Link to="/">Home</Link>

            </span>
          </li>
          {User.role==='user'&&<li
            className={`flex  rounded-md p-2 my-1 cursor-pointer hover:bg-light-white text-blue-500 font-medium opacity-70 hover:scale-105 text-sm items-center gap-x-4 
              `}
          >
            <CalendarIcon className="h-6 w-6 text-blue-400" />

            <span className={`${!open && "hidden"} origin-left duration-200`}>

                      <Link to="/Appointments">Appointments</Link>

            </span>
          </li>}

          {User.role==='user'&&<li
            className={`flex  rounded-md p-2 my-1 cursor-pointer hover:bg-light-white text-blue-500 font-medium opacity-70 hover:scale-105 text-sm items-center gap-x-4 
              `}
          >
            <CursorArrowRippleIcon className="h-6 w-6 text-blue-400" />

            <span className={`${!open && "hidden"} origin-left duration-200`}>

            <Link to="/Form">Apply Doctor</Link>


              
            </span>
          </li>}


          {User.role==='admin'&&<li
            className={`flex  rounded-md p-2 my-1 cursor-pointer hover:bg-light-white text-blue-500 font-medium opacity-70 hover:scale-105 text-sm items-center gap-x-4 
              `}
          >
            <CursorArrowRippleIcon className="h-6 w-6 text-blue-400" />

            <span className={`${!open && "hidden"} origin-left duration-200`}>

            <Link to="/Users">Users</Link>


              
            </span>
          </li>}

          {User.role==='admin'&&<li
            className={`flex  rounded-md p-2 my-1 cursor-pointer hover:bg-light-white text-blue-500 font-medium opacity-70 hover:scale-105 text-sm items-center gap-x-4 
              `}
          >
            <CursorArrowRippleIcon className="h-6 w-6 text-blue-400" />

            <span className={`${!open && "hidden"} origin-left duration-200`}>

            <Link to="/Doctors">Doctors</Link>

            </span>
          </li>}



          <li
            className={`flex  rounded-md p-2 my-1 cursor-pointer hover:bg-light-white text-blue-500 font-medium opacity-70 hover:scale-105 text-sm items-center gap-x-4 
              `}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-blue-400" />

            <span onClick={logoutt} className={`${!open && "hidden"} origin-left duration-200`}>

              Logout
            </span>
          </li>

        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <Navbar/>
        <UserList/>
      </div>
    </div>
  );
};
export default Users;