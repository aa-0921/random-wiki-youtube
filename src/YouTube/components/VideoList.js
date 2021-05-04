import React from "react";

export const VideoList = (props) => {
  const video = props.videos.map((video, index) => {
    const url = "https://www.youtube.com/embed/" + video.id.videoId;

    return (
      <div style={{ margin: "20px", textAlign: "center" }} key={index}>
        <iframe
          id="ytplayer"
          type="ytplayer"
          width="480"
          height="270"
          src={url}
          frameBorder="0"
          title={index}
        />
      </div>
    );
  });

  return <div style={{ marginTop: "10px" }}>{video}</div>;
};
