import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function AntPat() {
    const [appointments,setappointments]= useState(null)

    const getpatientsappointments= async()=>{
        try {
            const data= await axios.get("/api/getpatientsappointments")
            setappointments(data.data.getpatientsappointments)

            console.log(data.data.getpatientsappointments,'getpatientsappointments');

        } catch (error) {  
            console.log("Try again")  
        }
      }
      useEffect(() => {
        getpatientsappointments()
      }, [])
      

    const onChangepage = (page) => {
        console.log(page);
       
      };


      const changestatusofappointment= async(appointmentid)=>{

        console.log(appointmentid)
        toast("Please wait")

        try {
            const data= await axios.post("/api/changestatusofappointment",{
                appointmentId:appointmentid,status:"Approved"
            })
            console.log(data,'This is approved')
            toast("Approved appointment successfully")
            getpatientsappointments()


        } catch (error) {  
            console.log("Error from client catch")  
        }

      }


  return (
    <section class="flex flex-col justify-center antialiased bg-white text-gray-600 rounded-2xl mt-2  p-4">
    <div class="h-full">
       
        <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Customers</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">ID</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Patients</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Phone</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Time and Date</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Status</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">

                            {appointments&&appointments.map(one=>(
                                <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="">{one&&one.userwhobook&&one.userwhobook.idwhobook}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{one&&one.userwhobook&&one.userwhobook.namewhobook}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">023322324242</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex justify-center items-center">
                                        <div class="">{one&&one.dateofbooking}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex justify-center items-center gap-x-4">
                                    <div class="text-pink-300">{one&&one.statusofappointmentSchema}</div>

                                        {one&&one.statusofappointmentSchema==='pending'&&
                                         <div onClick={()=>changestatusofappointment(one._id)} class="text-green-300 cursor-pointer">Please Approve</div>}
                                    </div>
                                </td>
                            </tr>

                            ))}
                          
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <Pagination className="flex justify-center items-center mt-8" onChange={onChangepage}  defaultCurrent={1} total={50} />

    </div>
</section>

  )
}

export default AntPat