import { CompatClient, Stomp } from '@stomp/stompjs'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, RouteComponentProps, useHistory } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'
import SockJS from 'sockjs-client'

import Helmet from '../components/Helmet'
import { AppStateType } from '../redux/reducers/root-reducer'
import { fetchPerfumeByQuery, fetchPerfumeReviewsWS } from '../redux/thunks/perfume-thunks'
import { addReviewToPerfume, resetForm } from '../redux/thunks/user-thunks'
import { Perfume, Review, ReviewData, ReviewError } from '../types/types'
import { WEBSOCKET_URL } from '../utils/constants/url'

import halfStar from '../assets/images/star-half.svg'

let stompClient: CompatClient | null = null

const Product: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const perfume: Partial<Perfume> = useSelector((state: AppStateType) => state.perfume.perfume)
    const reviews: Array<Review> = useSelector((state: AppStateType) => state.perfume.reviews)
    const errors: Partial<ReviewError> = useSelector((state: AppStateType) => state.user.reviewErrors)
    const isReviewAdded: boolean = useSelector((state: AppStateType) => state.user.isReviewAdded)
    const loading: boolean = useSelector((state: AppStateType) => state.perfume.isPerfumeLoading)

    const [author, setAuthor] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [rating, setRating] = useState<number>(0)
    const {authorError, messageError, ratingError} = errors

    useEffect(() => {
        dispatch(fetchPerfumeByQuery(match.params.id))
        dispatch(resetForm())
        window.scrollTo(0, 0)
        const socket = new SockJS(WEBSOCKET_URL)
        stompClient = Stomp.over(socket)
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/reviews/" + match.params.id, (response: any) => {
                dispatch(fetchPerfumeReviewsWS(JSON.parse(response.body)));
            })
        })
        return () => stompClient?.disconnect()
    }, [])

    useEffect(() => {
        setAuthor("")
        setMessage("")
        setRating(0)
    }, [isReviewAdded])

    const addToCart = (): void => {
        const perfumeId: number | undefined = perfume.id
        let data: string | null = localStorage.getItem("perfumes")
        let cart: Map<number, any> = data ? new Map(JSON.parse(data as string)) : new Map()

        if (cart.has(perfumeId as number)) {
            cart.set(perfumeId as number, cart.get(perfumeId as number) + 1);
        } else {
            cart.set(perfumeId as number, 1)
        }
        localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())))
        history.push("/cart")
    }

    const addReview = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const review: ReviewData = {perfumeId: match.params.id as string, author, message, rating}
        dispatch(addReviewToPerfume(review))
    }

    const renderStars = (perfumeRating: number = 5): JSX.Element => {
        return (
            <StarRatingComponent
                renderStarIconHalf={() => <img src={halfStar} alt="halfStar"
                                               style={{width: "14.5px", marginBottom: "2px"}}/>}
                renderStarIcon={() => <i className='bx bx-star'></i>}
                name={"star"}
                starCount={5}
                editing={false}
                value={perfumeRating}/>
        )
    }

    return (
        <Helmet title='Product'>
            <div className="product">
                <div className="product__image">
                    <img src={perfume.filename} alt=''/>
                </div>
                <div className="product__info">
                    <h2>{perfume.perfumeTitle}</h2>
                    <div className="product__info__review">
                        <div className="col-md-2">
                            {renderStars(perfume.perfumeRating === 0 ? 5 : perfume.perfumeRating)}
                        </div>
                        <div className="col-md-10">
                            <span style={{paddingBottom: "50px"}}>{perfume.reviews?.length} reviews</span>
                        </div>
                    </div>
                    <div className='product__info__row'>
                        <div className='product__info__row__item'>
                            <div className='product__info__row__item__title'>
                                Release Year:
                            </div>
                            <span>
                                {perfume.year}
                            </span>
                        </div>
                        <div className='product__info__row__item right'>
                            <div className='product__info__row__item__title'>
                                Country:
                            </div>
                            <span>
                                {perfume.country}
                            </span>
                        </div>
                    </div>
                    <div className='product__info__row'>
                        <div className='product__info__row__item'>
                            <div className='product__info__row__item__title'>
                                Perfume Type:
                            </div>
                            <span>
                                {perfume.type}
                            </span>
                        </div>
                        <div className='product__info__row__item right'>
                            <div className='product__info__row__item__title'>
                                Bottle Size:
                            </div>
                            <span>
                                {perfume.volume} ml.
                            </span>
                        </div>
                    </div>
                    <div className='product__info__row price'>
                        <div className='product__info__row__item'>
                            <div className='product__info__row__item__title'>
                                Perfume Gender:
                            </div>
                            <span>
                                {perfume.perfumeGender}
                            </span>
                        </div>
                        <div className='product__info__row__item__price'>
                            <div className='product__info__row__item__price__main'>
                                ${perfume.price}.
                            </div>
                            <div className='product__info__row__item__price__sub'>
                                00
                            </div>
                        </div>
                    </div>
                    <div className='product__button'>
                        <button onClick={addToCart}>
                            <i className='bx bx-cart'> Add To Cart</i>
                        </button>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Product