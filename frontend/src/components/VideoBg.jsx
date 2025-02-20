import React from 'react';
import vid from '../assets/bg1.mp4';
import bg from '../assets/bg.jpg';
import { cn } from '@/lib/utils';
const VideoBackground = ({ children,className }) => {
  return (
    <div className={cn("relative w-screen h-screen bg-black overflow-hidden",className)}>
      {/* <img src={bg} alt="bg" className="absolute top-0 left-0 w-full h-full object-cover transform rotate-180 blur-xl z-0" /> */}
      <video 
        src={vid}
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover transform rotate-180 blur-xl z"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;