import React, { useState } from 'react';
import {
    Carousel, CarouselCaption, CarouselControl,
    CarouselIndicators, CarouselItem
} from 'reactstrap';

const items = [
    {
        src: '/images/slide1-1200x400.png',
        altText: 'Изображение участка поля',
        //caption: 'Очень хороший',
        key: 1,
    },
    {
        src: '/images/slide2-1200x400.jpg',
        altText: 'Рекомендации',
        //caption: 'Мега хороший',
        key: 2,
    },
    {
        src: '/images/slide3-1200x400.jpg',
        altText: 'Технологическая карта',
        //caption: 'Да-да',
        key: 3,
    },
];

function CarouselMenu(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.altText}
                />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    );
}

export default CarouselMenu;