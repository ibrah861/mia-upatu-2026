import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../App_Connection/Connection";
import { Loader } from "../../Loader/Loader";
import { Loader1 } from "../../Loader/Loader";

export const UserDashboard = () => {
  const [notitice, setNotification] = useState("");
  const navigate = useNavigate();
  //
  const user_data = async () => {
    const get_details = await API.get("/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    });

    const notification = get_details?.data?.notification;

    //
    setNotification(notification);
  };
  //
  useEffect(() => {
    user_data();
  }, []);

  return (
    <div>
      <div className="notification">
      </div>
      <>
        {!!notitice ? (
          <div>
            <h2> Welcome Ibrahim </h2>
          </div>
        ) : (
          <div className="place_loader_center">
            <>
              <div className="center_PreLoading">
                <Loader1 />
                <div className="loading_text">
                  <h3 style={{color:"black",textAlign:"center"}}>
                    Loading content
                    <br/>
                    <br/>
                    <span style={{color:"black", fontSize :"medium", }}>
                      Please wait...
                    </span>
                  </h3>
                </div>
              </div>
            </>
          </div>
        )}
      </>
    </div>
  );
};
