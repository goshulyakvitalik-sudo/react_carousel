import { useState } from 'react';
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

  const maxStartIndex = Math.max(0, images.length - frameSize);
  const currentIndex = Math.min(startIndex, maxStartIndex);

  const canMovePrevious = infinite
    ? images.length > frameSize
    : currentIndex > 0;

  const canMoveNext = infinite
    ? images.length > frameSize
    : currentIndex < maxStartIndex;

  const handleNext = () => {
    setStartIndex(current => {
      const safeCurrent = Math.min(current, maxStartIndex);

      if (infinite && safeCurrent >= maxStartIndex) {
        return 0;
      }

      return Math.min(safeCurrent + step, maxStartIndex);
    });
  };

  const handlePrevious = () => {
    setStartIndex(current => {
      const safeCurrent = Math.min(current, maxStartIndex);

      if (infinite && safeCurrent === 0) {
        return maxStartIndex;
      }

      return Math.max(safeCurrent - step, 0);
    });
  };

  const frameWidth = itemWidth * frameSize;
  const translateDistance = currentIndex * itemWidth;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: frameWidth,
        }}
      >
        <div
          className="Carousel__list"
          style={{
            transform: `translateX(-${translateDistance}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <img
              key={image}
              className="Carousel__image"
              src={image}
              alt=""
              style={{
                width: itemWidth,
              }}
            />
          ))}
        </div>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          data-cy="previous"
          className="Carousel__button"
          disabled={!canMovePrevious}
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button
          type="button"
          data-cy="next"
          className="Carousel__button"
          disabled={!canMoveNext}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
