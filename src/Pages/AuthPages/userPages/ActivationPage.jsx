import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../Loader/Loader";
// import Swal from "sweetalert2";
import Swal from "sweetalert2";

// API
import { API } from "../../../App_Connection/Connection";

export const ActivationPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [unAllowedText, setUnAllowedText] = useState(false);
  const [Loading, setLoading] = useState(true);

  const [isAllowed, setIsAllowed] = useState(null);
  const [checkActivation, setChekActivation] = useState(false);
  const [permission_approved, setPermission_approved] = useState(false);

  const getData = async () => {
    try {
      const user_data = await API.get("/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });

      const allowedUser = user_data?.data?.userData;

      if (allowedUser?.activate && allowedUser?.userPermission) {
        navigate("/dashboard");
      } else {
        setUnAllowedText(true);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUserPermissions = async () => {
    try {
      const update = await API.put(`/allow_my_activation/${id}`, {
        userPermission: true,
      });
    } catch (error) {
      setIsAllowed(error?.response?.data?.isnotallowed);
    }
  };

  useEffect(() => {
    updateUserPermissions();
  }, []);

  const activeMessage = () => {
    Swal.fire({
      title: "",
      text: "Account verification failed",
      icon: "error",
      color: "red",
      draggable: false,
    });
  };

  useEffect(() => {
    if (isAllowed) return activeMessage();
  }, [isAllowed]);

  // -------------------------------

  // update user Permission
  const updateUserPermission = async () => {
    setLoading(true);
    try {
      const update = await API.put(`/allow_my_activation/${id}`, {
        userPermission: true,
      });

      const admin_permission_success = update?.data?.admin?.activate;
      setPermission_approved(admin_permission_success);
      //
    } catch (error) {
      const isallowed = error?.response?.data?.isnotallowed;
      setChekActivation(isallowed);

      if (isallowed) {
        const timeOut = () => {
          setChekActivation(false);
        };

        setTimeout(timeOut, 1000);
      }

      if (error?.response?.data?.isnotallowed) return setUnAllowedText(true);
    } finally {
      setLoading(false);
    }
  };

  const verificationsuccess = () => {
    Swal.fire({
      title: "",
      text: "Account verification success",
      icon: "success",
      color: "green",
      draggable: false,
    });
  };

  useEffect(() => {
    if (permission_approved) {
      verificationsuccess();
      navigate("/dashboard")
    }
  }, [permission_approved]);

  const verifyAccount = () => {
    Swal.fire({
      title: "",
      text: "Can not verify account. because admin permission is missing",
      icon: "error",
      color: "red",
      draggable: false,
    });
  };

  useEffect(() => {
    if (checkActivation) return verifyAccount();
  }, [checkActivation]);

  return (
    <div className="bg-cl">
      <div className="activate-window">
        <div className="container_activater">
          <div className="active">
            {unAllowedText && (
              <>
                <h2>Hongera! </h2>
                <p>Umefanikiwa kutengeneza akaunti yako kikamilifu</p>
              </>
            )}

            <div>
              {Loading ? (
                <div className="button-endelea">
                  <div className="proceeding-loader">
                    <Loader />
                    <span>
                      <b>Verifying Account...</b>
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    className="button-wezesha"
                    onClick={() => {
                      updateUserPermission();
                    }}
                  >
                    Wezesha account
                  </button>

                  <div className="activate-message">
                    <h3>Wezesha akaunti</h3>
                    <p>
                      Akaunti yako bado haija wezeshwa. Tafadhali wezesha akauti
                      yako ili iweze kufanya kazi
                    </p>

                    <p>
                      Kwa msaada zaidi wasiliana nasi kupitia nambari za simu :
                      0773820021
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
