import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// import Swal from "sweetalert2";
import Swal from "sweetalert2";

// images
import group from "../../assets/group.png";

// images for src/ assets
import image from "../../assets/kiongozi wavijana.jpg"

// auth
import { API } from "../../App_Connection/Connection";

// Loader
import { Loader } from "../../Loader/Loader";

const initialState = {
  // input value
  email: "",
  password: "",
  Loading: false,
};

// ---------------
const reducer = (state, action) => {
  if (action.LoadType) {
    return {
      ...state,
      Loading: action.LoadType,
    };
  }

  if (action.LoadType === false) {
    return {
      ...state,
      Loading: action.LoadType,
    };
  }
  // Switch Type
  if (action.type === "SET_EMAIL") {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === "SET_PASSWORD") {
    return {
      ...state,
      password: action.payload,
    };
  }
};
// ----------------

export const Signin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // usestate
  const [buttonChoice, setButtonChoice] = useState(false);

  //
  const [success, setSuccess] = useState(false);
  const [failLogin, setFailLogint] = useState(false);

  // ------------

  // use Navigate
  const navigate = useNavigate();

  const submitSignupFrom = async (e) => {
    e.preventDefault();

    dispatch({
      LoadType: true,
    });

    try {
      // signup
      const signin = await API.post("/auth-signin", {
        email: state.email,
        password: state.password,
      });

      console.log(signin);

      const user_token = localStorage.setItem(
        "user_token",
        signin?.data?.token,
      );

      setSuccess(signin?.data?.message);

      if (signin?.data?.message) {
        const navigateTime = () => {
          navigate(`/activation/${signin?.data?.user?._id}`);
        };
        navigateTime();
      }

      const time = () => {
        setSuccess(false);
      };

      setTimeout(time, 1000);
    } catch (err) {
      setFailLogint(err?.response?.data?.message);

      const time = () => {
        setFailLogint(false);
      };

      setTimeout(time, 1000);
    } finally {
      dispatch({
        LoadType: false,
      });
    }
  };

  const loginSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "",
      text: "You are logged in successfully",
      color: "green",
      showConfirmButton: false,
      timer: 5000,
    });
  };

  const loginfailed = () => {
    Swal.fire({
      title: "",
      text: "Incorrect password or email ID",
      icon: "error",
      color: "red",
      draggable: false,
    });
  };

  useEffect(() => {
    if (success) {
      loginSuccess();
    }
  }, [success]);

  // fail to Create Account
  useEffect(() => {
    if (failLogin) {
      loginfailed();
    }
  }, [failLogin]);

  return (
    <>
      <div className="card-center">
        <section>
          <div className="title_image">
            <img src={group} alt="group" />
          </div>

          <h2>INGIA NDANI</h2>
          <form onSubmit={submitSignupFrom}>
            <p>
              Ingia ndani ya akaunti yako kwa kuandika userID yako pamoja nelo
              la siri
            </p>
            <div className="email_part">
              <div>
                <label htmlFor="email">Email : </label>
                <input
                  type="email"
                  placeholder="exam573@gmail.com"
                  required
                  value={state.email}
                  onChange={(e) => {
                    dispatch({
                      payload: e.target.value,
                      type: "SET_EMAIL",
                    });
                  }}
                />
              </div>

              <div>
                <label htmlFor="email">Password : </label>
                <input
                  type="text"
                  placeholder="* * * * * * * * * * * * *"
                  required
                  value={state.password}
                  onChange={(e) => {
                    dispatch({
                      payload: e.target.value,
                      type: "SET_PASSWORD",
                    });
                  }}
                />
              </div>
            </div>

            <div className="button-endelea">
              {state.Loading ? (
                <div className="proceeding-loader">
                  <Loader /> <span>Proceeding...</span>
                </div>
              ) : (
                <button>{true ? "Tengeneza" : "Endelea"}</button>
              )}
            </div>

            {state.Loading ? null : (
              <p style={{ color: "black", fontSize: "small" }}>
                Sina akaunti.&nbsp;
                <Link to="/signup">
                  <span style={{ color: "blue", textDecoration: "none" }}>
                    Tengeza akaunti !
                  </span>
                </Link>
              </p>
            )}
          </form>
        </section>
      </div>
     <div className="image_box_frame">
             <div className="image_frame">
              <img src={image} alt="" />
             </div>
           </div>
    </>
  );
};
