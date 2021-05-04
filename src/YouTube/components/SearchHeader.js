import React, { useState } from "react";
import _ from "lodash";

export const SearchHeader = (props) => {
  const [keyword, setKeyword] = useState("twice");

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
    _debounce(e.target.value);
  };

  const _debounce = _.debounce((value) => {
    props.onSerchYoutube(value);
  }, 200);

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <input onChange={handleChangeInput} value={keyword} />
    </div>
  );
};
