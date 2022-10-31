import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import {  markasallcompleted,deleteall} from "../redux/actions/UserActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function MessagesCom() {

   const navigate = useNavigate();

   const dispatch = useDispatch();

    const { User ,loading } = useSelector((state) => state.User);

    console.log('after login',User)

    // console.log(User.user.seenmessages,'aaaaa')

    // console.log(User.data.user,'This isssss')
    // console.log(User.unseenmessages,'unseenmessages')


    const data = [
        {
          label: "Unseen",
          value: "html",
          tab: "Mark as all completed",

          desc: User.unseenmessages,
        },
        {
          label: "Seen",
          value: "react",
          tab: "Deleted All",
          desc: User.seenmessages,
        },
     
      ];

      const delandmark=(tab)=>{
        if(tab==="Mark as all completed"){
          console.log(tab,'Mark as all completed')
          dispatch(markasallcompleted()); 
        }
        if(tab==="Deleted All"){
          console.log(tab,'Deleted All')
          dispatch(deleteall());
        }
      }
 
  return (
    <Tabs className="mt-4 cursor-pointer  " value="html">
      <TabsHeader className="bg-blue-400">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody>
        {data&& data.map(({ value, desc,tab }) => (
          <TabPanel key={value} value={value}>
        <div className='w-fit rounded-xl font-normal flex p-2 underline hover:bg-blue-300  justify-end items-end'><span onClick={(e)=>delandmark(tab)}>{tab}</span></div>
            {
              desc.map((mess)=>(
                <div onClick={()=>navigate("/Doctors")} className='border flex px-2 py-1 mt-3  items-center opacity-60 border-blue-300'>
                {mess.data.message}
              </div>
              ))
            }
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    
  )
}

export default MessagesCom