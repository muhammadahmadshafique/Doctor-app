import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const UserRoute = ({ children }) => {
  const navigate = useNavigate();

  // state
  const [ok, setOk] = useState(false);
  // router

  useEffect(() => {
    
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
        console.log(data,'FROm protected routesssssssssssssssss');
      if (data.ok) {
        setOk(true)

      }else{
        navigate("/Login");

      }
    } catch (err) {
      console.log(err);
      setOk(false);
      navigate("/Login");
    }
  };

    fetchUser();
  }, [navigate]);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="flex justify-center items-center"
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default UserRoute; 
