'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroVideoProps {
  posterSrc: string;
  videoSrc: string;
  className?: string;
}

export default function HeroVideo({
  posterSrc,
  videoSrc,
  className,
}: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-lg shadow-2xl',
        className,
      )}
    >
      {!isPlaying ? (
        <button
          type='button'
          className='group relative block h-full w-full'
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label='Play preview video'
        >
          <Image
            src={posterSrc}
            alt='Course platform preview poster'
            fill
            priority={false}
            sizes='(min-width: 1024px) 800px, 100vw'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-black/30' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black transition-transform group-hover:scale-105'>
              <Play className='h-4 w-4' /> Play
            </span>
          </div>
        </button>
      ) : (
        <video
          onClick={() => setIsPlaying(!isPlaying)}
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
          className='h-full w-full object-cover'
        >
          <source src={videoSrc} type='video/mp4' />
        </video>
      )}
    </div>
  );
}
