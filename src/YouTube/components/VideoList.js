import "../../assets/App.css";
import React from "react";
// import { CardColumns, Card } from "react-bootstrap";

export const VideoList = (props) => {
  console.log("VideoListのprops.videos", props.videos);
  return (
    <div>
      {props.isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {/* {props.videos.length !== 0 ? ( */}
          {/* <CardColumns> */}
          <div className="video-wrap flex items-center justify-center">
            {props.videos ? (
              <>
                {props.videos.map((video) => (
                  <div key={video.id.videoId} className="m-2">
                    {/* ----------------------------- */}
                    <div className="card_container md:h-auto max-h-96">
                      <div className="card">
                        <div className="img">
                          {/* <Card.Img */}
                          <img
                            variant="top"
                            src={video.snippet.thumbnails.high.url}
                            alt=""
                          />
                          <div className="font-bold m-8">
                            {/* 動画のタイトル */}
                            {video.snippet.title}
                          </div>
                        </div>

                        <div className="card_footer">
                          <div className="card_text">
                            {/* <h5 className="name">Jerin Hasan</h5> */}
                            {/* <h6 className="designation">Frontend Developer</h6> */}
                            <div>動画の説明：{video.snippet.description}</div>
                            <div>
                              チャンネルのタイトル{video.snippet.channelTitle}
                            </div>

                            <a
                              href={`https://www.youtube.com/embed/${video.id.videoId}`}
                            >
                              YouTubeのリンク（埋め込み）
                            </a>
                            <a
                              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            >
                              YouTubeのリンク
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ---------------------------- */}
                    {/* <div onClick={() => handleModalSubmit(image)} variant="light"> */}
                    {/*
                <Card className="border-none">
                  <div variant="light">
                    <Card.Img
                      variant="top"
                      src={video.snippet.thumbnails.high.url}
                    />
                    <div>動画のタイトル：{video.snippet.title}</div>
                    <div>動画の説明：{video.snippet.description}</div>
                    <div>チャンネルのタイトル{video.snippet.channelTitle}</div>

                    <a
                      href={`https://www.youtube.com/embed/${video.id.videoId}`}
                    >
                      YouTubeのリンク（埋め込み）
                    </a>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    >
                      YouTubeのリンク
                    </a>
                  </div>
                </Card> */}
                    {/* ---------------------------- */}
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>

          {/* </CardColumns> */}
          {/* ) : (
            <div>{videoExistText}</div>
          )} */}
          <div className="h-32 p-10">{props.videoExistText}</div>
        </>
      )}
    </div>
  );
};
