import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Perfume } from '../types/types'

type PropTypes = {
    key: number
    perfume: Perfume
    link: string
}

const ProductCard: FC<PropTypes> = ({ key, perfume, link }) => {

    return (
        <div key={key} className='product-card'>
            <Link to={`${link}/${perfume.id}`}>
                <div className='product-card__image'>
                    <img src={perfume.filename} alt="" />
                </div>
                <div className='product-card__price'>${perfume.price}.00</div>
            </Link>
            <div className='product-card__btn'>
                <Link className='product-card__bottom' to={`${link}/${perfume.id}`}>
                    <h3 className="product-card__name">{perfume.perfumeTitle}</h3>
                    <div className='product-card__bottom__item'>
                        <i className='bx bx-show'></i>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard