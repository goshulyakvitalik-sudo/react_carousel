import React from 'react';
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
  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: itemWidth * frameSize,
        }}
      >
        <div
          className="Carousel__list"
          style={{
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <img
              key={image}
              src={image}
              alt=""
              width={itemWidth}
            />
          ))}
        </div>
      </div>

      <div className="Carousel__buttons">
        <button>Previous</button>

        <button data-cy="next">
          Next
        </button>
      </div>
    </div>
  );
};
