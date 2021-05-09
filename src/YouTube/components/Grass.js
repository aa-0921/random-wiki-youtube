import React from "react";
// import _ from "lodash";

export const Grass = (props) => {
  return (
    <div>
      <div className="card_container">
        <div className="card">
          <div className="img">
            <img
              src="https://cdn.pixabay.com/photo/2020/05/31/10/06/sailing-5242101_960_720.jpg"
              alt=""
            />
          </div>

          <div className="card_footer">
            <div className="card_text">
              <h5 className="name">Jerin Hasan</h5>
              <h6 className="designation">Frontend Developer</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="card_container">
        <div className="card">
          <div className="img">
            <img
              src="https://cdn.pixabay.com/photo/2020/05/31/10/06/sailing-5242101_960_720.jpg"
              alt=""
            />
          </div>

          <div className="card_footer">
            <div className="card_text">
              <h5 className="name">Jerin Hasan</h5>
              <h6 className="designation">Frontend Developer</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
