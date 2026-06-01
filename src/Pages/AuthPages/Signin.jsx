import React from "react";
import { Link } from "react-router-dom";

// images
import group from "../../assets/group.png";

// Loader
import { Loader } from "../../Loader/Loader";

export const Signin = () => {
  return (
    <div className="card-center">
      <section>
        <img src={group} alt="group" />
        <h2>Ingia </h2>
        <form>
          <div>
            <p>
              Ingia katika akaunti yako kwa kuandika email yako hapo chini
              <span className="example-email">ibra200@gmail.com</span>
            </p>
          </div>

          <div className="email_part">
            <div>
              <label htmlFor="email">Email : </label>
              <input type="text" placeholder="ibra200@gmail.com" />
            </div>
          </div>

          <div className="button-endelea">
            {true ? (
              <div className="proceeding-loader">
                <Loader /> <span>Proceeding...</span>
              </div>
            ) : (
              <button>Endelea</button>
            )}
          </div>

          {true ? null : (
            <p style={{ color: "black" }}>
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
  );
};
