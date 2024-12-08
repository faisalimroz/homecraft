import React from 'react';

interface VideoComponentProps {
  videoUrl: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ videoUrl }) => {
  const extractVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoUrl);

  return (
    <div>
      {videoId && <div>
        <h5 className="text-2xl font-semibold mb-4">Video</h5>
      <div id="background-video" className="relative">
        <div className="h-[250px] md:h-[400px]">
          {videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Video could not be loaded</p>
          )}
        </div>
      </div>
        </div>}
    </div>
  );
};

export default VideoComponent;
