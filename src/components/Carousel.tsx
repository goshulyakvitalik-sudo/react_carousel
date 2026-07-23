import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [startIndex, setStartIndex] = useState(0);

  const imageGap = 10;

  const maxStartIndex = Math.max(0, images.length - frameSize);

  const currentIndex = Math.min(startIndex, maxStartIndex);

  const canMovePrevious = infinite
    ? images.length > frameSize
    : currentIndex > 0;

  const canMoveNext = infinite
    ? images.length > frameSize
    : currentIndex < maxStartIndex;

  const handleNext = () => {
    if (!canMoveNext) {
      return;
    }

    setStartIndex(current => {
      const safeCurrent = Math.min(current, maxStartIndex);

      if (infinite && safeCurrent === maxStartIndex) {
        return 0;
      }

      return Math.min(safeCurrent + step, maxStartIndex);
    });
  };

  const handlePrevious = () => {
    if (!canMovePrevious) {
      return;
    }

    setStartIndex(current => {
      const safeCurrent = Math.min(current, maxStartIndex);

      if (infinite && safeCurrent === 0) {
        return maxStartIndex;
      }

      return Math.max(safeCurrent - step, 0);
    });
  };

  const frameWidth =
    itemWidth * frameSize + imageGap * (frameSize - 1);

  const translateDistance =
    currentIndex * (itemWidth + imageGap);

  return (
    <div className="Carousel">
      <button
        type="button"
        data-cy="previous"
        className={`Carousel__button Carousel__button--previous ${
          !canMovePrevious ? 'disabled' : ''
        }`}
        disabled={!canMovePrevious}
        onClick={handlePrevious}
      >
        Previous
      </button>

      <div
        className="Carousel__frame"
        style={{
          width: frameWidth,
        }}
      >
        <div
          className="Carousel__list"
          style={{
            gap: imageGap,
            transform: `translateX(-${translateDistance}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={`${image}-${index}`}
              className="Carousel__image"
              src={image}
              alt={`Carousel item ${index + 1}`}
              style={{
                width: itemWidth,
                height: itemWidth,
              }}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        data-cy="next"
        className={`Carousel__button Carousel__button--next ${
          !canMoveNext ? 'disabled' : ''
        }`}
        disabled={!canMoveNext}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};
