// import axios from "axios";
// import { SearchHeader } from "../components/SearchHeader";
// import { VideoList } from "../components/VideoList";
// import "../assets/App.css";
import "../../assets/App.css";

import React, { useState, useEffect } from "react";
import { Button, CardColumns, Card, Form } from "react-bootstrap";
// import { VerticallyCenteredModal } from "../components/VerticallyCenteredModal";
// import { Toast } from "../components/Toast";
// import { toast } from "react-toastify";
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";

export const YoutubeList = () => {
  const [videos, setVideos] = useState([]);
  //検索フォームの文字列
  const [text, setText] = useState("");
  //今なんの検索文字列で検索しているか
  const [query, setQuery] = useState("resort");
  // const [modalShow, setModalShow] = useState(false);
  // const [clickedImage, setClickedImage] = useState(undefined);

  useEffect(() => {
    console.log("useEffectが走りました");
    console.log(process.env.REACT_APP_CLIENT_ID);

    //表示するページ数をランダムに
    // var min = 1;
    // var max = 5;
    // var page_num = Math.floor(Math.random() * (max + 1 - min)) + min;

    const params = {
      key: YOUTUBE_API_KEY,
      q: query, // 検索キーワード
      type: "video", // video,channel,playlistから選択できる
      maxResults: "3", // 結果の最大数
      order: "viewCount", // 結果の並び順を再生回数の多い順に
      part: "snippet",
    };
    const queryParams = new URLSearchParams(params);

    fetch(
      YOUTUBE_SERACH_API_URI + queryParams
      // `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${query}&maxResults=3&key=${YOUTUBE_API_KEY}`
      // `https://api.unsplash.com/search/photos?query=${query}&page=${page_num}&per_page=30&client_id=${process.env.YOUTUBE_API_KEY}` // `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
      // `https://api.unsplash.com/search/collections?query=${query}&page="5"&client_id=${process.env.REACT_APP_CLIENT_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data::::::::", data);
        setVideos(data.items);
      });
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault(); //submitボタンにもともと備わっている画面遷移を打ち消す
    setQuery(text); //inputタグに入れられた文字が入る
    // notify(text);
    setText(""); //フォームはまっさらな状態に戻したい
    console.log("onSubmitが呼ばれました。");
  };

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
    // <>
    //   <SearchHeader onSerchYoutube={onSerchYoutube} />
    //   {/* 追加 */}
    //   {videos ? <VideoList videos={videos} /> : <></>}
    // </>
    <div className="text-center">
      <div className="container flex flex-col items-center">
        <div className="form-block w-1/2 my-4">
          <Form onSubmit={onSubmit}>
            <Form.Control
              size="lg"
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Search text"
            />
            <Button type="submit" className="my-2">
              Search
            </Button>
          </Form>
        </div>
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
                </div>
              </Card>
            </div>
          ))}
        </CardColumns>
        {/* clickedImageの有無によって表示を分岐
これによって、clickedImage内のhashでundefinedのエラーがでない */}
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
