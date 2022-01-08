import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import img1 from '../assets/images/slider/img1.gif'
import img2 from '../assets/images/slider/img2.png'
import img3 from '../assets/images/slider/img3.png'

const sliderItems = [
    {
        id: "21",
        title: "Soul by Calvin Klein",
        img: img1,
        description: "Luxurious. Romantic. Timeless. Inspired by a simple band of diamonds and the ideal of lasting love and intimacy, the floral scent is a harmonious blend of classic and contemporary style"
    },
    {
        id: "33",
        title: "N°5",
        img: img2,
        description: "N°5, the very essence of femininity. An aldehyde floral bouquet housed in an iconic bottle with a minimalist design. A timeless, legendary fragrance."
    },
    {
        id: "109",
        title: "MISS DIOR",
        img: img3,
        description: "Miss Dior Eau de Toilette is a fresh and heady olfactory composition"
    }
]

const HeroSlider: FC = () => {

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(
        () => {
            const index = activeSlide + 1 === sliderItems.length ? 0 : activeSlide + 1
            setActiveSlide(index)
        },
        [activeSlide],
    )

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? sliderItems.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        const slideAuto = setInterval(() => {
            nextSlide()
        }, 5000);
        return () => {
            clearInterval(slideAuto)
        }
    }, [nextSlide])

    return (
        <div className="hero-slider">
            {
                sliderItems.map((item, index) => (
                    <div key={index} className={`hero-slider__item ${index === activeSlide ? 'active' : ''}`}>
                        <div className="hero-slider__item__image">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="hero-slider__item__info">
                            <div className="hero-slider__item__info__title">
                                <span>{item.title}</span>
                            </div>
                            <div className="hero-slider__item__info__description">
                                <span>{item.description}</span>
                            </div>
                            <div className="hero-slider__item__info__btn">
                                <Link to={`/product/${item.id}`}>
                                    <button>
                                        <div className='content'>
                                            <div className='text'>
                                                <p className='head'>Go to Product</p>
                                                <p className='sub'>BUY NEW ITEM NOW!</p>
                                            </div>
                                            <i className='bx bx-caret-right'></i>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="hero-slider__control">
                <div className="hero-slider__control__item" onClick={prevSlide}>
                    <i className="bx bx-chevron-left"></i>
                </div>
                <div className="hero-slider__control__item">
                    <div className="index">
                        {activeSlide + 1}/{sliderItems.length}
                    </div>
                </div>
                <div className="hero-slider__control__item" onClick={nextSlide}>
                    <i className="bx bx-chevron-right"></i>
                </div>
            </div>
        </div>
    )
}

export default HeroSlider