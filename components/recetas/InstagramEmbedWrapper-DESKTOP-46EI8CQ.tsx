import { useEffect, useId, useState } from 'react';
// import { InstagramEmbed } from 'react-social-media-embed';

interface IgWrapp {
  url: string;
}

function getEmbedTikTokLink(tiktokLink: string): string {
  const videoId = tiktokLink.split('/').pop();
  const embedLink = `https://www.tiktok.com/embed/v2/${videoId}`;
  return embedLink;
}

function EmbedLink({ url }: IgWrapp) {
  const myID = useId();
  let myLink = url;
  if (url.includes('instagram.com')) {
    myLink += 'embed/';
  }
  if (url.includes('tiktok.com')) {
    myLink = getEmbedTikTokLink(url);
  }
  return (
    <div>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: 400,
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        <iframe
          id={myID}
          title={myID}
          width="400"
          height="400"
          style={{
            overflow: 'hidden',
            position: 'relative',
            scrollMargin: 0,
            overflowY: 'hidden',
            border: 0,
          }}
          src={myLink}
          seamless
        />
      </div>
    </div>
  );
}

export default function InstagramEmbedWrapper({ url }: IgWrapp) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (url.includes('instagram.com') || url.includes('tiktok.com')) {
    return (
      <div>
        <EmbedLink url={url} />
      </div>
    );
  }

  return <div />;
}
