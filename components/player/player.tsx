import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';
export const Player = (props: { src: string }) => {
  return (
    <MediaPlayer title='Sprite Fight' src={props.src}>
      <MediaProvider />
      <PlyrLayout
        // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
        icons={plyrLayoutIcons}
      />
    </MediaPlayer>
  );
};
