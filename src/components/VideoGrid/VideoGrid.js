import { useEffect, useRef, useState } from "react";

const VideoGrid = ({ videos = [] }) => {
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (videoRefs.current[0]) {
      const firstVideo = videoRefs.current[0];
      if (firstVideo.readyState >= 2) {
        firstVideo.play().catch(() => {});
      } else {
        firstVideo.oncanplay = () => {
          firstVideo.play().catch(() => {});
          firstVideo.oncanplay = null;
        };
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          if (video.readyState >= 2) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.slice(0, 4).map((video, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          data-index={index}
          src={video.videoUrl}
          muted
          loop
          playsInline
          className="w-full h-auto"
          onMouseEnter={() => handleMouseEnter(index)}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
