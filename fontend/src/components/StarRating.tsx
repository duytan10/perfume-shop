import React, { FC } from 'react'
import StarRatingComponent from 'react-star-rating-component'

import halfStar from '../assets/images/star-half.svg'

const StarRating: FC<{ perfumeRating:number }> = ({ perfumeRating }) => {
    return (
        <>
            <StarRatingComponent
                renderStarIconHalf={() => <img src={halfStar} alt='halfStar' style={{ width: "13px", marginBottom: "-1px" }} />}
                renderStarIcon={() => <i className='bx bx-star'></i>}
                name={"star"}
                starCount={5}
                editing={false}
                value={perfumeRating === 0 ? 5 : perfumeRating}
            />
        </>
    )
}

export default StarRating