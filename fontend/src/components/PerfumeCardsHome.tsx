import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { AppStateType } from '../redux/reducers/root-reducer';
import { fetchPerfumesByIdsQuery } from '../redux/thunks/perfume-thunks';
import { Perfume } from '../types/types';

const PerfumeCardsHome: FC = () => {

    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);
    const perfumesId: Array<number> = [43, 44, 45, 32, 33, 97, 102, 99, 30];

    useEffect(() => {
        dispatch(fetchPerfumesByIdsQuery(perfumesId));
    }, [])

    return (
        <>
            {
                perfumes.map((perfume: Perfume) => {
                    for (let i = 0; i < perfumesId.length; i++) {
                        if (perfume.id === perfumesId[i]) {
                            return (
                                <div key={perfume.id} className="product-card">
                                    <Link to={`/product/${perfume.id}`}>
                                        <div className="product-card__image">
                                            <img src={perfume.filename} alt="" />
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    }
                })
            }
        </>
    )
}

export default PerfumeCardsHome