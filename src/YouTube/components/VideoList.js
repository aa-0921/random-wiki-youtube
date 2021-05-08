import "../../assets/App.css";
import React from "react";
import { CardColumns, Card } from "react-bootstrap";

export const VideoList = (props) => {
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
                    <div>{video.snippet.title}</div>
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
