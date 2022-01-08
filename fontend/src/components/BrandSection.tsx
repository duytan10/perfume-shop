import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { BrandType } from '../types/types'

const brandsItem1: Array<BrandType> = [
    {name: "Tom Ford", url: "https://i.ibb.co/s9MpxnG/o-139.jpg"},
    {name: "Dior", url: "https://i.ibb.co/wCkG15S/o-160.jpg"},
    {name: "Chanel", url: "https://i.ibb.co/QrNd9DL/o-30.jpg"},
    {name: "Gucci", url: "https://i.ibb.co/z6gQzvg/o-67.jpg"},
    {name: "Calvin Klein", url: "https://i.ibb.co/98r6KXm/o-18.jpg"}
]

const brandsItem2 : Array<BrandType> = [
    {name: "Lancome", url: "https://i.ibb.co/Jkzsj7v/o-80.jpg"},
    {name: "Prada", url: "https://i.ibb.co/2Y5Lsvy/o-143.jpg"},
    {name: "Dolce&Gabbana", url: "https://i.ibb.co/Sycbcbv/o-56.jpg"},
    {name: "Givenchy", url: "https://i.ibb.co/0hT49zf/o-66.jpg"}
]

const BrandSection: FC = () => {
    return (
        <div className='brand-section'>
            <div className='brand-section__item__above'>
                {
                    brandsItem1.map((brand: BrandType, index: number) => (
                        <Link key={index} to={{ pathname: "/catalog", state: { id: brand.name } }}>
                            <img className='brand-section__item__image' src={brand.url} alt={brand.name} />
                        </Link>
                    ))
                }
            </div>
            <div className='brand-section__item__under'>
                {
                    brandsItem2.map((brand: BrandType, index: number) => (
                        <Link key={index} to={{ pathname: "/catalog", state: { id: brand.name } }}>
                            <img className='brand-section__item__image' src={brand.url} alt={brand.name} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default BrandSection