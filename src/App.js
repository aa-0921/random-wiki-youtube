import "./assets/App.css";
import React from "react";
// import { MemberList } from "./pages/MemberList";
// import { PhotoList } from "./pages/PhotoList";
import { YoutubeList } from "./YouTube/pages/YoutubeList";
// import { Test } from "./YouTube/pages/Test";

export const App = () => {
  return (
    <div>
      {/* <MemberList /> */}
      <React.StrictMode>
        <YoutubeList />
        {/* <Test /> */}
      </React.StrictMode>
    </div>
  );
};
