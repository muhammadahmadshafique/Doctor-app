import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { TimePicker } from 'antd';
import { DatePicker } from 'antd';
import moment from "moment";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function AppointmentBook() {
    const navigate = useNavigate();


    let { id } = useParams();

    const [doctor, setDoctor] = useState(null)
    const [timeofappointment, setTimeofappointment] = useState()
    const [dateofappointment, setDateofappointment] = useState()


    const onChange = (time, timeString) => {
        setTimeofappointment(moment(time, "HH:mm").toISOString())

    };


    const dateonChange = (date, dateString) => {
        setDateofappointment(moment(date, "DD-MM-YYYY").toISOString())

    };


    const fetchallusers = async () => {
        try {
            const data = await axios.post("/api/doctorbyid", {
                doctorID: id,
            })
            setDoctor(data)

        } catch (error) {
        }
    }


    const apoointmentset = async () => {
        try {
            const data = await axios.post("/api/appointmentcreated", {
                doctorID: id,
                timeofappointment: timeofappointment,
                dateofappointment: dateofappointment,
            })
            console.log(data)
        toast("Appointment Book")
        navigate("/Appointments")

        } catch (error) {
            console.log(error)
        }
    }


   





    
    useEffect(() => {
        fetchallusers()
    }, [])


    if (doctor) {
        console.log("DoctorbyIDDDDDD", doctor.data[0])
    }



    return (
        doctor && doctor.data && doctor.data[0] && <div className="flex flex-col-reverse justify-center items-center mt-12">
             
             <button onClick={apoointmentset} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-28 mt-4 rounded">
                Book Now
            </button>
        
            <div className="flex items-center w-full gap-x-4 justify-center">

                <div >
                    <TimePicker onChange={onChange} format={'HH:mm'} />

                </div>
                <div>
                    <DatePicker onChange={dateonChange} format="DD-MM-YYYY" />
                </div>
                <div>
                </div>


            </div>
            

            <div class="flex items-center w-full justify-center">
                <div>
                    <div class="max-w-xs h-64 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                        <div>
                            <h4 tabindex="0" class="focus:outline-none text-gray-800 dark:text-gray-100 font-bold mb-3">{doctor.data && doctor.data[0].name}</h4>
                            <p tabindex="0" class="focus:outline-none text-gray-800 dark:text-gray-100 text-sm">Probabo, inquit, sic agam, ut labore et voluptatem sequi nesciunt, neque porro quisquam est, quid malum, sensu iudicari, sed ut alterum.</p>
                        </div>
                        <div>
                            <div class="flex items-center justify-between text-gray-800">
                                <p tabindex="0" class="focus:outline-none text-sm dark:text-gray-100">{`${doctor && doctor.data && doctor.data[0].timing[0]}--${doctor && doctor.data && doctor.data[0].timing[1]}`}</p>
                                <div class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/single_card_with_title_and_description-svg1.svg" alt="icon" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default AppointmentBook