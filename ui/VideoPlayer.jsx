import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const VideoPlayer = ({ stream, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video
      style={{ transform: "scaleX(-1)" }}
      className={cn("h-full w-full object-cover", className)}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
};
