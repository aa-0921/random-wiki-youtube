import "../../assets/App.css";
import React from "react";
import { CardColumns, Card } from "react-bootstrap";

export const VideoList = (props) => {
  console.log("VideoListのprops.videos", props.videos);
  return (
    <div>
      {props.isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {/* {props.videos.length !== 0 ? ( */}
          <CardColumns>
            {props.videos.map((video) => (
              <div key={video.id.videoId}>
                <Card className="border-none">
                  {/* <div onClick={() => handleModalSubmit(image)} variant="light"> */}
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
                </Card>
              </div>
            ))}
          </CardColumns>
          {/* ) : (
            <div>{videoExistText}</div>
          )} */}
          <div>{props.videoExistText}</div>
        </>
      )}
    </div>
  );
};
