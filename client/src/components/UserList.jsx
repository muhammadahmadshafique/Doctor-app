import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import axios from 'axios';

function UserList() {


    const [users,setUsers]=useState([])

    const onChangepage = (page) => {
        console.log(page);
       
      };

      const fetchallusers= async()=>{
        try {
            const data= await axios.get("/api/alluser")
            setUsers(data)
            
        } catch (error) {
            
        }
      }

      useEffect(() => {
        fetchallusers()
      }, [])
      
console.log("All users",users.data)

  return (
    <section class="flex flex-col justify-center antialiased bg-white text-gray-600 rounded-2xl mt-2  p-4">
    <div class="h-full">
       
        <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">All Users</h2>
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
                                    <div class="font-semibold text-left">User</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Email</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold ">Created At</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Actions</div>
                                </th>
                               
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                           {users&&users.data&& users.data.map(one=>(
                             <tr>
                             <td class="p-2 whitespace-nowrap">
                                 <div class="flex items-center">
                                     <div class="">{one._id}</div>
                                 </div>
                             </td>
                             <td class="p-2 whitespace-nowrap">
                                 <div class="text-left">{one.name}</div>
                             </td>
                             <td class="p-2 whitespace-nowrap">
                                 <div class="text-left font-medium text-green-500">{one.email}</div>
                             </td>
                             <td class="p-2 whitespace-nowrap">
                                 <div class="flex justify-center items-center">
                                     <div class="">{one.createdAt}</div>
                                 </div>
                             </td>
                             <td class="p-2 whitespace-nowrap">
                                 <div class="flex justify-center items-center">
                                     <div class="cursor-pointer text-red-300 underline">Block</div>
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

export default UserList