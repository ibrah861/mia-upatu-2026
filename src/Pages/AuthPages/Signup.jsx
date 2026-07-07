import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// import Swal from "sweetalert2";
import Swal from "sweetalert2";

// images
import group from "../../assets/group.png";

// auth
import { API } from "../../App_Connection/Connection";

// Loader
import { Loader } from "../../Loader/Loader";

// images for src/ assets
import image from "../../assets/kiongozi wavijana.jpg";

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

export const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // usestate
  const [resOrTex, setResOrTex] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [messageServer, setMessageServer] = useState("");
  const [proceedPassword, setProceedPassword] = useState(false);
  const [buttonChoice, setButtonChoice] = useState(false);

  //
  const [accountCreated, setAccountCreated] = useState(false);
  const [failCreatingAccount, setFailCreatingAccount] = useState(false);

  // ------------

  // use Navigate
  const navigate = useNavigate();

  const submitEmail = async (e) => {
    // prevent default
    e.preventDefault();

    dispatch({
      LoadType: true,
    });

    try {
      // response check email
      const response = await API.post("/auth-email", { email: state.email });
      //
      setProceedPassword(response.data.emailIsnotExist);
      //
      if (response.data.emailIsnotExist) {
        const userID = localStorage.setItem("email", state.email);
        setButtonChoice(true);
      }

      setResOrTex(response.data.isMessageFromServer);
      setMessageServer(response.data.message);
      setEmailExist(response.data.emailIsnotExist);

      const remove_Bg_Message = () => {
        setResOrTex(false);
      };

      setTimeout(remove_Bg_Message, 7000);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        LoadType: false,
      });
    }

    //
  };

  const submitSignupFrom = async (e) => {
    e.preventDefault();

    dispatch({
      LoadType: true,
    });

    try {
      // signup
      const signup = await API.post("/auth-signup", {
        email: localStorage.getItem("email"),
        password: state.password,
      });

      setAccountCreated(signup.data.isCreated);

      if (signup.data.isCreated) {
        const navigateTime = () => {
          navigate("/signin");
        };
        navigateTime();
      }
    } catch (err) {
      console.log(err.response.data.creatingFailed);
      setFailCreatingAccount(err.response.data.creatingFailed);

      const time = () => {
        setFailCreatingAccount(false);
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
      title: "Congratulation",
      text: "Your account has been created successfully",
      showConfirmButton: false,
      timer: 5000,
    });
  };

  const loginfailed = () => {
    Swal.fire({
      title: "Error",
      text: "User alredy exist",
      icon: "error",
      draggable: false,
    });
  };

  useEffect(() => {
    if (accountCreated) {
      loginSuccess();
    }
  }, [accountCreated]);

  // fail to Create Account
  useEffect(() => {
    if (failCreatingAccount) {
      loginfailed();
    }
  }, [failCreatingAccount]);

  return (
    <>
      <div className="card-center">
        <section className="form-content">
          <div className="title_image">
            <img src={group} alt="group" />
          </div>

          <h2>Create Account</h2>
          <form onSubmit={buttonChoice ? submitSignupFrom : submitEmail}>
            {false ? (
              <div>
                {false ? (
                  <p style={{ color: "black" }}>
                    Tafadhali andika neno la siri ili kuendelea
                  </p>
                ) : (
                  <p>Error : Either username or password is incorrect</p>
                )}
              </div>
            ) : (
              <div>
                {resOrTex ? (
                  <p className="message_geServer_box">{messageServer}</p>
                ) : (
                  <>
                    <p style={{ color: "black" }}>
                      Now you can create your new account by filling up bellow
                      email address box
                      <span className="example-email">exam573@gmail.com</span>
                    </p>
                    <p style={{ color: "black" }}>
                      Please use your valid email while you create new acount
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="email_part">
              {proceedPassword ? (
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
              ) : (
                <div>
                  <label htmlFor="email"> Email address </label>
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
              )}
            </div>

            <div className="confirm_detail">
              <p>
                <b>Before submition:</b> &nbsp;
                <span style={{ color: "black" }}>
                  Please ensure your email address is valid
                </span>
              </p>
            </div>

            <div className="button-endelea">
              {state.Loading ? (
                <div className="proceeding-loader">
                  <Loader /> <span>Proceeding...</span>
                </div>
              ) : (
                <button className="submit-button">
                  {true ? "Proceed" : "Submit"}
                </button>
              )}
            </div>

            {state.Loading ? null : (
              <p style={{ color: "black", fontSize: "small" }}>
                I have account alredy.&nbsp;
                <Link to="/signin">
                  <span style={{ color: "blue", textDecoration: "none" }}>
                  <b> sign in </b>
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
