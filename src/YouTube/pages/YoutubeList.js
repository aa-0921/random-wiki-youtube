import "../../assets/App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
// import _ from "lodash";
import { VideoList } from "../components/VideoList";
import { Grass } from "../components/Grass";

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";
const RANDOM_WIKI_API_URI = "https://ja.wikipedia.org/w/api.php?";

export const YoutubeList = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayRandomWikiTitle, setDisplayRandomWikiTitle] = useState("");
  const [videoExistText, setVideoExistText] = useState("");
  const [isFirstView, setIsFirstView] = useState(true);

  const getRandomWikiData = useCallback(async function () {
    const params = {
      format: "json",
      action: "query",
      list: "random",
      rnnamespace: "0",
      rnlimit: "1",
      origin: "*",
      prop: "info",
    };
    const queryParams = new URLSearchParams(params);
    const res = await fetch(RANDOM_WIKI_API_URI + queryParams);
    const data = await res.json();
    const random_title = data.query.random[0].title;

    return random_title;
  }, []);

  const fetchWikiDataFromTitle = useCallback(async function (randomWikiTitle) {
    const params = {
      format: "json",
      action: "query",
      titles: randomWikiTitle,
      prop: "extracts",
      redirects: "1",
      origin: "*",
    };
    const queryParams = new URLSearchParams(params);
    const res = await fetch(RANDOM_WIKI_API_URI + queryParams);
    const data = await res.json();
    const obj = data.query.pages;
    var wikiExtract = Object.keys(obj).map(function (key) {
      return obj[key];
    })[0].extract;

    wikiExtract = createElementFromHTML(wikiExtract);
    var parent_element = document.getElementById("set-wiki-extract");
    parent_element.appendChild(wikiExtract);

    return randomWikiTitle;
  }, []);

  const getYoutubeData = useCallback(async function (randomWikiTitle) {
    const params = {
      key: YOUTUBE_API_KEY,
      q: randomWikiTitle, // 検索キーワード
      maxResults: "3", // 結果の最大数
      order: "viewCount", // 結果の並び順を再生回数の多い順に
      part: "snippet",
      videoType: "any",
    };
    const queryParams = new URLSearchParams(params);
    const res = await fetch(YOUTUBE_SERACH_API_URI + queryParams);

    if (res.data === undefined) {
      console.log("APIの失敗");
    }

    const data = await res.json();
    return data.items;
  }, []);

  const setText = useCallback(async function (text) {
    // await setVideoExistText(text);

    // debugger;

    if (!isFirstView) {
      // debugger;

      if (text !== "YouTubeAPIの制限を超えています") {
        // debugger;

        if (videos.length > 0) {
          setVideoExistText("YouTube関連動画");
        } else {
          setVideoExistText("YouTube関連動画なし。");
        }
      } else {
        setVideoExistText("YouTubeAPIの制限を超えています");
      }
    }
  }, []);

  const onSubmit = useCallback(
    function () {
      var parent_element = document.getElementById("set-wiki-extract");
      var clone = parent_element.cloneNode(false); //ガワだけ複製して…
      parent_element.parentNode.replaceChild(clone, parent_element); //すげ替え。
      console.log("onSubmit内上部");

      setIsFirstView(false);
      setIsLoading(true);
      getRandomWikiData().then(function (randomWikiTitle) {
        fetchWikiDataFromTitle(randomWikiTitle).then(function (
          randomWikiTitle
        ) {
          getYoutubeData(randomWikiTitle)
            .then(function (result) {
              setDisplayRandomWikiTitle(randomWikiTitle);
              setVideos(result);
              setIsLoading(false);
              // debugger;

              var text = "";
              return text;
            })
            .catch((error) => {
              // debugger;
              console.log("getYoutubeDataのerror", error);
              var text = "YouTubeAPIの制限を超えています";
              // return Promise.reject(error);
              // text;
              debugger;
              return text;
            })
            .then(function (text) {
              setText(text);
            });
        });
      });
    },
    [fetchWikiDataFromTitle, getRandomWikiData, getYoutubeData]
  );

  // useEffect(() => {
  //   console.log("ifの中のvideos", videos);
  //   // console.log("ifの中のvideos.class", videos.class);

  //   console.log("videos.length > 0", videos.length > 0);

  //   // isFirstView;
  //   if (!isFirstView) {
  //     if (videos.length > 0) {
  //       setVideoExistText("YouTube関連動画");
  //     } else {
  //       setVideoExistText("YouTube関連動画なし。");
  //     }
  //   }
  // }, [videos]);

  // const notify = (text) => {
  //   toast(`${text}で検索しました`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     progress: undefined,
  //   });
  // };

  // const handleModalSubmit = (image) => {
  //   console.log("handleModalSubmit内image：：：：", image);
  //   setClickedImage(image);
  //   setModalShow(true);
  // };

  const createElementFromHTML = (html) => {
    const tempEl = document.createElement("div");
    tempEl.innerHTML = html;
    return tempEl.firstElementChild;
  };

  return (
    <div className="text-center">
      {/* <Grass /> */}
      <div className="container flex flex-col items-center">
        <div className="form-block w-1/2 my-4 pt-20">
          <Button onClick={() => onSubmit()} className="my-2">
            What's coming up
          </Button>
        </div>
        <div className="display-query text-2xl my-12">
          {displayRandomWikiTitle}
        </div>

        <div className="video-list-wrap">
          <VideoList
            videos={videos}
            isLoading={isLoading}
            videoExistText={videoExistText}
          />
        </div>
        {/* clickedImageの有無によって表示を分岐
これによって、clickeexport const functionName = (params) => {
}
dImage内のhashでundefinedのエラーがでない */}
        {/* {clickedImage ? (
          <VerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            clickedImage={clickedImage}
          />
        ) : (
          <></>
        )} */}
        {/* <Toast /> */}
        <div id="set-wiki-extract" className="display-query text-2xl"></div>
      </div>
    </div>
  );
};
