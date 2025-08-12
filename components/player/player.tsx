'use client';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';
export const Player = (props: {
  src: string;
  coverSrc?: string;
  coverAlt?: string;
}) => {
  return (
    <MediaPlayer
      //WARN:this will hide all video cover's in the same page and we need to find a way to hide the cover only without introducing react state
      onPlay={() => {
        const coverElement = document.querySelector('.video-cover');
        if (coverElement) {
          coverElement.classList.add('hidden');
        }
      }}
      title='Sprite Fight'
      src={props.src}
      playsInline={true}
    >
      <MediaProvider>
        {props.coverSrc && (
          <Poster
            className='video-cover'
            src={props.coverSrc}
            alt={props.coverAlt}
          />
        )}
      </MediaProvider>
      <PlyrLayout
        // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
        icons={plyrLayoutIcons}
      />
    </MediaPlayer>
  );
};
