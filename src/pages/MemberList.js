// import "./App.css";
// import "./assets/App.css";
import "../assets/App.css";

import React, { useState } from "react";
import axios from "axios";

export const MemberList = () => {
  const [member, setMember] = useState([]);

  const getJson = () => {
    // const url = "https://api.myjson.com/bins/159wqn";
    // https://zipcloud.ibsnet.co.jp/api/search
    // const url = "https://zipcloud.ibsnet.co.jp/api/search?2700032";
    const url = "http://localhost:3000/member";

    axios.get(url).then((res) => {
      console.log("res.data", res.data);
      setMember(res.data);
    });
  };

  const App = (list) => {
    const App = list.map((member, index) => {
      return (
        <li key={index}>
          {member.name} {member.age}
        </li>
      );
    });
    return <ul>{App}</ul>;
  };

  return (
    <div>
      <button onClick={getJson}>Get Json</button>
      {App(member)}
    </div>
  );
};
