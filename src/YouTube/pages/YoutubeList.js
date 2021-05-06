import "../../assets/App.css";
import React, { useState, useCallback } from "react";
import { Button, CardColumns, Card, Form } from "react-bootstrap";
import _ from "lodash";
// import { VerticallyCenteredModal } from "../components/VerticallyCenteredModal";
// import { Toast } from "../components/Toast";
// import { toast } from "react-toastify";
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";

const RANDOM_WIKI_API_URI =
  "https://ja.wikipedia.org/w/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=1&origin=*";

export const YoutubeList = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayRandomWikiTitle, setDisplayRandomWikiTitle] = useState("");
  // const [modalShow, setModalShow] = useState(false);
  // const [clickedImage, setClickedImage] = useState(undefined);

  const getRandomWikiData = useCallback(async function () {
    const res = await fetch(RANDOM_WIKI_API_URI);
    const data = await res.json();
    const random_title = data.query.random[0].title;

    return random_title;
  }, []);

  const getYoutubeData = useCallback(async function (randomWikiTitle) {
    const params = {
      key: YOUTUBE_API_KEY,
      q: randomWikiTitle, // 検索キーワード
      // type: "video", // video,channel,playlistから選択できる
      maxResults: "3", // 結果の最大数
      order: "viewCount", // 結果の並び順を再生回数の多い順に
      part: "snippet",
      videoType: "any",
    };
    const queryParams = new URLSearchParams(params);

    const res = await fetch(YOUTUBE_SERACH_API_URI + queryParams);
    const data = await res.json();
    console.log("⑦getYouTubeVideos内のdata", data);
    console.log("⑨getYouTubeVideos内のdata.items", data.items);

    return data.items;
  }, []);

  const onSubmit = useCallback(function () {
    console.log("onSubmit内上部");

    setIsLoading(true);
    getRandomWikiData().then(function (randomWikiTitle) {
      console.log("getRandomWikiData後の", randomWikiTitle);

      getYoutubeData(randomWikiTitle).then(function (result) {
        setDisplayRandomWikiTitle(randomWikiTitle);
        setVideos(result);
        console.log("setVideos後のvideos", videos);

        setIsLoading(false);
      });
    });
  }, []);

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

  return (
    <div className="text-center">
      <div className="container flex flex-col items-center">
        <div className="form-block w-1/2 my-4">
          <Button onClick={() => onSubmit()} className="my-2">
            なにがでるかな
          </Button>
        </div>
        <div className="display-query text-2xl">{displayRandomWikiTitle}</div>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            {/* <div>{videos}</div> */}
            {videos.length !== 0 ? (
              <CardColumns>
                {videos.map((video) => (
                  <div key={video.id.videoId}>
                    <Card className="border-none">
                      {/* <div onClick={() => handleModalSubmit(image)} variant="light"> */}
                      <div variant="light">
                        <Card.Img
                          variant="top"
                          src={video.snippet.thumbnails.high.url}
                        />
                        <div>{video.snippet.title}</div>
                      </div>
                    </Card>
                  </div>
                ))}
              </CardColumns>
            ) : (
              <div>検索結果なし！もう一度ボタンをおしてください</div>
            )}
          </>
        )}

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
      </div>
    </div>
  );
};
