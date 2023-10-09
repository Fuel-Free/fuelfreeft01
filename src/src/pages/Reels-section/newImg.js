import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import tata from '../../images/volvo.png';

const images = [
  { name: tata, vw: '355w' },
  { name: tata, vw: '481w' },
  { name: tata, vw: '584w' },
  { name: tata, vw: '687w' },
  { name: tata, vw: '770w' },
  { name: tata, vw: '861w' },
  { name: tata, vw: '955w' },
  { name: tata, vw: '1033w' },
  { name: tata, vw: '1112w' },
  { name: tata, vw: '1192w' },
  { name: tata, vw: '1200w' }
];

const NewIMG = () => {
  const srcSet = images.map(image => `${image.name} ${image.vw}`).join(', ');

  return (
    <div className="perimeter111">
      <div className="image1111">
        <ReactImageMagnify
          smallImage={{
            alt: 'Tata Image', // Update alt text
            isFluidWidth: true,
            src: tata, // Use the local image URL
            srcSet: srcSet,
            sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
          }}
          largeImage={{
            alt: 'Tata Image (Large)', // Update alt text
            src: tata, // Use the local image URL
            width: 1200,
            height: 1800,
          }}
          isHintEnabled={true}
        />
      </div>
      <div className="copy">
        <h3>Touch</h3>
        <p className="App-intro">
          Press (long touch) the image to magnify. Pan (drag) to traverse the image.
        </p>
        <p className="App-intro">
          Note that the page can be scrolled when the touch begins on the image.
        </p>
        <h3>Mouse</h3>
        <p>Hover over the image to magnify.</p>
      </div>
    </div>
  );
};

export default NewIMG;
