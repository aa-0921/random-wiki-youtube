import React, { useState, useCallback } from "react";

const getRandomString = function () {
  return Math.random().toString(32).substring(2);
};

export const RandomResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const getRandomWikiData = useCallback(async function () {
    await fetch("https://example.com", {
      mode: "no-cors",
    });

    return getRandomString();
  }, []);

  const getYoutubeData = useCallback(async function (query) {
    return `you searched youtube with ${query} query`;
  }, []);

  const onSubmit = useCallback(function () {
    setIsLoading(true);
    getRandomWikiData().then(function (randomWikiTitle) {
      getYoutubeData(randomWikiTitle).then(function (result) {
        setResult(result);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <button onClick={onSubmit}>submit</button>
          {result}
        </>
      )}
    </div>
  );
};
