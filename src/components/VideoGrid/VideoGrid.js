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
        let firstVisibleIndex = null;
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting && firstVisibleIndex === null) {
            firstVisibleIndex = index;
          }
        });
        if (firstVisibleIndex !== null) {
          setActiveIndex(firstVisibleIndex);
        }
      },
      { threshold: 1 }
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
          } else {
            video.oncanplay = () => {
              video.play().catch(() => {});
              video.oncanplay = null;
            };
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
        <div key={index} className="flex flex-col shadow-slideShadow bg-[#F6F6F6]">
          <div
            className={`text-center italic text-[#2b2b2b] opacity-[0.88] font-medium ${video.font ? `text-[${video.font}px]` : 'text-[14px]'} leading-[16px] h-[65px] pt-2 px-2`} 
            dangerouslySetInnerHTML={{ __html: video.text }} 
          ></div>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            data-index={index}
            src={video.videoUrl}
            muted
            loop
            playsInline
            className="w-full h-auto"
            onMouseEnter={() => handleMouseEnter(index)}
          />
          <div className="text-[#2b2b2b] opacity-[0.88] justify-center text-center h-8 flex items-center font-semibold">{video.title}</div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;