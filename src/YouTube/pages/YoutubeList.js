// import axios from "axios";
// import { SearchHeader } from "../components/SearchHeader";
// import { VideoList } from "../components/VideoList";
// import "../assets/App.css";
import "../../assets/App.css";
import { RandomResult } from "../pages/sample";

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
  //検索フォームの文字列
  const [text, setText] = useState("");
  //今なんの検索文字列で検索しているのか
  // const [query, setQuery] = useState("初期値");
  // const [randomTitle, setRandomTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [result, setResult] = useState("");

  const [displayRandomWikiTitle, setDisplayRandomWikiTitle] = useState("");
  // console.log("YoutubeList内のquery", query);

  // const [modalShow, setModalShow] = useState(false);
  // const [clickedImage, setClickedImage] = useState(undefined);

  // const gotData = (data) => {
  //   console.log("gotDataのdata", data);
  // };

  // const onSubmit = async (e) => {
  //   console.log("①onSubmit内のquery", query);
  //   console.log("②onSubmit内のtext", text);

  //   e.preventDefault(); //submitボタンにもともと備わっている画面遷移を打ち消す
  //   // setQuery(text); //inputタグに入れられた文字が入る
  //   // await getRandomWiki();
  //   getRandomWiki().then((random_title) => {
  //     console.log("getRandomWiki().thenの中のrandom_title", random_title);

  //     setRandomTitle(random_title);
  //     console.log("getRandomWiki().thenの中のquery", query);

  //     // getYouTubeVideos();
  //   });

  //   // setQuery(randomTitle);
  //   // debugger;
  //   console.log("⑤getRandomWiki直後のquery", query);
  //   console.log("⑥getRandomWiki直後のtext", text);
  //   // notify(text);
  //   setText(""); //フォームはまっさらな状態に戻したい
  //   console.log("onSubmitが呼ばれました。");
  //   // getYouTubeVideos();
  // };

  // useEffect(() => {
  //   if (randomTitle) {
  //     setQuery(randomTitle);
  //   }
  //   getYouTubeVideos();
  // }, [randomTitle]);

  // const getRandomWiki = async () => {
  //   const res = await fetch(RANDOM_WIKI_API_URI);
  //   // console.log(res);

  //   const data = await res.json();
  //   console.log("③getRandomWiki内のdata", data);
  //   console.log("④data.query.random[0].title", data.query.random[0].title);

  //   const random_title = data.query.random[0].title;
  //   // debugger;
  //   return random_title;
  //   // setRandomTitle(random_title);
  //   // debugger;
  // };

  // const getYouTubeVideos = async () => {
  //   const params = {
  //     key: YOUTUBE_API_KEY,
  //     q: query, // 検索キーワード
  //     // type: "video", // video,channel,playlistから選択できる
  //     maxResults: "3", // 結果の最大数
  //     order: "viewCount", // 結果の並び順を再生回数の多い順に
  //     part: "snippet",
  //     videoType: "any",
  //   };
  //   const queryParams = new URLSearchParams(params);

  //   const res = await fetch(YOUTUBE_SERACH_API_URI + queryParams);
  //   const data = await res.json();
  //   console.log("⑦getYouTubeVideos内のdata", data);
  //   console.log("⑧getYouTubeVideos内のquery", query);
  //   console.log("⑨getYouTubeVideos内のdata.items", data.items);

  //   if (data.items) {
  //     console.log("⑩getYouTubeVideos内のtrue", data.items);

  //     // await setVideos(

  //     setVideos(
  //       data.items.map((item) => {
  //         item.snippet.title = _.unescape(item.snippet.title);
  //         return item;
  //       })
  //     );
  //   } else {
  //     console.log("elseのonSubmit直前");
  //     onSubmit();
  //     // onSubmit();
  //   }
  //   // setQuery(data.query.random[0].title);
  // };

  // --------------------------------------
  const getRandomWikiData = useCallback(async function () {
    const res = await fetch(RANDOM_WIKI_API_URI);

    console.log("getRandomWikiData内のres", res);

    const data = await res.json();

    //   console.log("③getRandomWiki内のdata", data);
    //   console.log("④data.query.random[0].title", data.query.random[0].title);

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
    // console.log("⑧getYouTubeVideos内のquery", query);
    console.log("⑨getYouTubeVideos内のdata.items", data.items);

    return data.items;
  }, []);

  const onSubmit = useCallback(function (e) {
    e.preventDefault(); //submitボタンにもともと備わっている画面遷移を打ち消す

    console.log("onSubmit内上部");

    setIsLoading(true);
    getRandomWikiData().then(function (randomWikiTitle) {
      console.log("getRandomWikiData後の", randomWikiTitle);

      getYoutubeData(randomWikiTitle).then(function (result) {
        setDisplayRandomWikiTitle(randomWikiTitle);
        setVideos(result);
        setIsLoading(false);
      });
    });
  }, []);

  // const getRandomWiki = () => {
  //   const res = fetch(RANDOM_WIKI_API_URI);
  //   // console.log(res);

  //   const data = res.json();
  //   console.log("getRandomWiki内のdata", data);
  //   console.log("data.query.random[0].title", data.query.random[0].title);

  //   setQuery(data.query.random[0].title);
  //   debugger;
  // };

  // getWeather()
  //   .then((data) => {
  //     console.log(JSON.stringify(data));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // fetch(RANDOM_WIKI_API_URI)
  //   .then((response) => response.json())
  //   .then((wiki_data) => {
  //     // debugger;
  //     setQuery(wiki_data.query.random[0].title);
  //     // wiki_data.query.random[0].title
  //     console.log("WIKI_data::::::::", wiki_data);
  //   });

  // useEffect(() => {
  //   console.log("useEffectが走りました");

  //   // getRandomWiki();
  //   // ~~~~youtube~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //   const params = {
  //     key: YOUTUBE_API_KEY,
  //     q: query, // 検索キーワード
  //     // type: "video", // video,channel,playlistから選択できる
  //     maxResults: "3", // 結果の最大数
  //     order: "viewCount", // 結果の並び順を再生回数の多い順に
  //     part: "snippet",
  //     videoType: "any",
  //   };
  //   const queryParams = new URLSearchParams(params);

  //   console.log("検索直前queryの内容", query);
  //   console.log(
  //     "YOUTUBE_SERACH_API_URI + queryParams",
  //     YOUTUBE_SERACH_API_URI + queryParams
  //   );

  //   fetch(YOUTUBE_SERACH_API_URI + queryParams)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data::::::::", data);
  //       console.log("data.items::::::::", data.items);

  //       if (data.items) {
  //         setVideos(
  //           data.items.map((item) => {
  //             item.snippet.title = _.unescape(item.snippet.title);
  //             return item;
  //           })
  //         );
  //       } else {
  //         getRandomWiki();
  //         // onSubmit();
  //       }

  //       console.log("mapしたあとのdata::::::::", data);
  //     });
  //   // ~~~~youtube~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // }, [query]);

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
          <Form onSubmit={onSubmit}>
            <Form.Control
              size="lg"
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Search text"
            />
            <Button type="submit" className="my-2">
              なにがでるかな
            </Button>
          </Form>
        </div>
        <div className="display-query text-2xl">{displayRandomWikiTitle}</div>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
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
          </>
        )}

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
