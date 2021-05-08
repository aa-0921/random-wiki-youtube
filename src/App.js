import "./assets/App.css";
import React from "react";
import { YoutubeList } from "./YouTube/pages/YoutubeList";

export const App = () => {
  return (
    <div>
      <React.StrictMode>
        <YoutubeList />
      </React.StrictMode>
    </div>
  );
};
