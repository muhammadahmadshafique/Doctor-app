import React from 'react'
import { BellAlertIcon } from '@heroicons/react/24/solid'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const { User ,loading } = useSelector((state) => state.User);

  return (
    <div>
        <div className="flex justify-between p-6 border border-blue-100 rounded-xl"> 
            <div className='text-lg text-blue-300 underline whitespace-nowrap'>{User && User.name}</div>
            <div className='relative'>
            <span className='absolute right-0 bottom-4  flex justify-center items-center w-4 h-4 bg-pink-400 rounded-full'>{User && User.unseenmessages&&User.unseenmessages.length}</span>
            <BellAlertIcon onClick={()=>navigate("/messages")} className="h-6 w-6 absolute cursor-pointer top-2 right-2 text-blue-400" />
            </div>
        </div>
    </div>
  )
}

export default Navbar