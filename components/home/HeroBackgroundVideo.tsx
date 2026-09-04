"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Video as VideoIcon } from "lucide-react";

interface HeroBackgroundVideoProps {
  videoSrc?: string;
  fallbackVideoSrc?: string;
  posterSrc?: string;
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  videoSrc = "/videos/hero-sunup.mp4",
  fallbackVideoSrc = "/videos/hero-clouds.mp4",
  posterSrc = "/images/hero-poster.jpg",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => setVideoLoaded(true);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("canplay", handleCanPlay);

    // Attempt autoplay
    video.play().catch(() => {
      // Auto-play was prevented (e.g. power saving mode)
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-slate-950"
    >
      {/* 1. Cinematic Background Poster Image (Ken Burns slow ambient zoom) */}
      <div
        className={[
          "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 scale-105",
          videoLoaded ? "opacity-30" : "opacity-75 animate-pulse-subtle",
        ].join(" ")}
        style={{
          backgroundImage: `url('${posterSrc}')`,
          backgroundPosition: "center 40%",
        }}
      />

      {/* 2. Looping Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterSrc}
        className={[
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
          videoLoaded ? "opacity-45" : "opacity-0",
        ].join(" ")}
      >
        <source src={videoSrc} type="video/mp4" />
        {fallbackVideoSrc && <source src={fallbackVideoSrc} type="video/mp4" />}
      </video>

      {/* 3. Multi-layer Dark Gradient Overlays for 100% Contrast & Text Readability */}
      {/* Radial spotlight from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95" />
      {/* Horizontal gradient to keep left text area extra legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/80" />
      {/* Bottom fade into the white impact section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent" />

      {/* Subtle Grid Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      {/* 4. Interactive Video Play/Pause Control (Clickable via pointer-events-auto) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md text-xs font-semibold shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <VideoIcon className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">
            {isPlaying ? "Live Ambient Video" : "Video Paused"}
          </span>
          {isPlaying ? (
            <Pause className="w-3 h-3 text-slate-400 group-hover:text-white" />
          ) : (
            <Play className="w-3 h-3 text-emerald-400 group-hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeroBackgroundVideo;
