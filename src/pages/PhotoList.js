import "../assets/App.css";

import React, { useState, useEffect } from "react";
import { Button, CardColumns, Card, Form } from "react-bootstrap";
import { VerticallyCenteredModal } from "../components/VerticallyCenteredModal";
import { Toast } from "../components/Toast";
import { toast } from "react-toastify";

export const PhotoList = () => {
  const [images, setImages] = useState([]);
  //検索フォームの文字列
  const [text, setText] = useState("");
  //今なんの検索文字列で検索しているか
  const [query, setQuery] = useState("resort");
  const [modalShow, setModalShow] = useState(false);
  const [clickedImage, setClickedImage] = useState(undefined);

  useEffect(() => {
    console.log("useEffectが走りました");
    console.log(process.env.REACT_APP_CLIENT_ID);

    //表示するページ数をランダムに
    var min = 1;
    var max = 5;
    var page_num = Math.floor(Math.random() * (max + 1 - min)) + min;

    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page_num}&per_page=30&client_id=${process.env.REACT_APP_CLIENT_ID}` // `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
      // `https://api.unsplash.com/search/collections?query=${query}&page="5"&client_id=${process.env.REACT_APP_CLIENT_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages(data.results);
      });
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault(); //submitボタンにもともと備わっている画面遷移を打ち消す
    setQuery(text); //inputタグに入れられた文字が入る
    notify(text);
    setText(""); //フォームはまっさらな状態に戻したい
    console.log("onSubmitが呼ばれました。");
  };

  const notify = (text) => {
    toast(`${text}で検索しました`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      progress: undefined,
    });
  };

  const handleModalSubmit = (image) => {
    console.log("handleModalSubmit内image：：：：", image);
    setClickedImage(image);
    setModalShow(true);
  };

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
              Search
            </Button>
          </Form>
        </div>
        <CardColumns>
          {images.map((image) => (
            <div key={image.id}>
              <Card className="border-none">
                <div onClick={() => handleModalSubmit(image)} variant="light">
                  <Card.Img variant="top" src={image.urls.regular} />
                </div>
              </Card>
            </div>
          ))}
        </CardColumns>
        {/* clickedImageの有無によって表示を分岐
これによって、clickedImage内のhashでundefinedのエラーがでない */}
        {clickedImage ? (
          <VerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            clickedImage={clickedImage}
          />
        ) : (
          <></>
        )}
        <Toast />
      </div>
    </div>
  );
};
