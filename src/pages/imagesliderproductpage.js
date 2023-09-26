import React, { useState, useEffect } from 'react';
import ImageMagnify from 'react-image-magnify';
import ReactImageMagnify from 'react-image-magnify';
import config from "../utils/config";

function ImageSlider({ productImage }) {
  // Set initial state to the first image in the productImage array
  const [sliderData, setSliderData] = useState(productImage.length > 0 ? productImage[0] : null);

  // Update the sliderData state when productImage prop changes
  useEffect(() => {
    if (productImage.length > 0) {
      setSliderData(productImage[0]);
    }
  }, [productImage]);

  const handleClick = (index) => {
    console.log(index);
    const slider = productImage[index];
    setSliderData(slider);
  };
  // const srcSet = images.map(image => `${image.name} ${image.vw}`).join(', ');

  return (
    <div className='new-megni-class'>
     
      {sliderData && (
        <ReactImageMagnify className='new-megni-class-inn'
          smallImage={{
            alt: 'Tata Image', // Update alt text
            isFluidWidth: true,
            src: `${config.url}/${sliderData}`, // Use the local image URL
            // srcSet: srcSet,
            sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
          }}
          largeImage={{
            alt: 'Tata Image (Large)', // Update alt text
            src: `${config.url}/${sliderData}`, // Use the local image URL
            width: 2000,
            height: 2000,
          }}
          isHintEnabled={true}
          />
      )}
      <div className='flex_row'>
        {productImage &&
          productImage.map((data, i) => (
            <div className='thumbnail'>
              <img
                className={data[i] === i ? 'clicked' : ''}
                src={`${config.url}/${data && data}`}
                key={data._id}
                onClick={() => handleClick(i)}
                height='0'
                width='100'
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageSlider;