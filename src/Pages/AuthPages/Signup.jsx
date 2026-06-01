import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";

// images
import group from "../../assets/group.png";

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
  if (action.type) {
      return {
        ...state,
        email: action.payload,
        password : action.payload
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
  const [proceedPassword, setProceedPassword] = useState (false) ;

  // ------------

  const submit = async (e) => {
    // prevent default
    e.preventDefault();

    dispatch({
      LoadType: true,
    });

    try {
      // response
      const response = await API.post("/auth-email", { email: state.email });
      setProceedPassword (response.data.emailExist)

      setResOrTex(response.data.isMessageFromServer);
      setMessageServer(response.data.message);
      setEmailExist(response.data.emailExist);

      const remove_Bg_Message = () => {
        setResOrTex(false);
      };

      setTimeout(remove_Bg_Message, 7000);
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch({
          LoadType: false,
        });
    }
  };

  return (
    <div className="card-center">
      <section>
        <img src={group} alt="group" />
        <h2>Fungua akaunti</h2>
        <form onSubmit={submit}>
          {false ? (
            <div>
              {false ? (
                <p style={{ color: "black" }} >
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
                <p style={{ color: "black" }}>
                  Fungua akaunti kwa kuandika email yako hapo chini
                  <span className="example-email">exam573@gmail.com</span>
                </p>
              )}
            </div>
          )}

          <div className="email_part">
            {proceedPassword ? (
              <div>
                <label htmlFor="email">Password : </label>
                <input 
                type="password" 
                placeholder="* * * * * * * * * * * * *"
                required
                value={state.password}
                onChange={(e) => {
                  dispatch({
                    payload : e.target.value,
                    type : "SET_PASSWORD"
                  })
                }}
                 />
              </div>
            ) : (
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
            )}
          </div>

          <div className="button-endelea">
            {state.Loading ? (
              <div className="proceeding-loader">
                <Loader /> <span>Proceeding...</span>
              </div>
            ) : (
              <button>Endelea</button>
            )}
          </div>

          {state.Loading ? null : (
            <p style={{ color: "black",fontSize:"small" }}>
              Sina akaunti.&nbsp;
              <Link to="/signin">
                <span style={{ color: "blue", textDecoration: "none",  }}>
                  Tengeza akaunti !
                </span>
              </Link>
            </p>
          )}
        </form>
      </section>
    </div>
  );
};
