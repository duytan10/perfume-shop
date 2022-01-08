import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useLocation } from 'react-router-dom'

import CheckBox from '../components/CheckBox'
import CheckBoxRadio from '../components/CheckBoxRadio'
import Helmet from '../components/Helmet'
import InfinityList from '../components/InfinityList'

import { AppStateType } from '../redux/reducers/root-reducer'
import { fetchPerfumes, fetchPerfumesByFilterParams, fetchPerfumesByGender, fetchPerfumesByPerfumer } from '../redux/thunks/perfume-thunks'
import { FilterParamsType, Perfume, PerfumePrice } from '../types/types'

const Catalog: FC = () => {
    
    const dispatch = useDispatch()
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes)
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        perfumers: [],
        genders: [],
        prices: []
    })
    const [sortByPrice, setSortByPrice] = useState<boolean>()
    const { state } = useLocation<{ id: string }>()

    useEffect(() => {
        const perfumeData: string = state.id

        if (perfumeData === "female" || perfumeData === "male") {
            dispatch(fetchPerfumesByGender({perfumeGender: perfumeData}))
            window.scrollTo(0, 0)
        } else if (perfumeData === "all") {
            dispatch(fetchPerfumes())
            window.scrollTo(0, 0)
        } else {
            dispatch(fetchPerfumesByPerfumer({perfumer: perfumeData}))
            window.scrollTo(0, 0)
        }
    }, [])

    const getProducts = (variables: FilterParamsType): void => {
        dispatch(fetchPerfumesByFilterParams(variables))
    }

    const handlePrice = (value: number): Array<number> => {
        let find = price.find((item) => item.id == value)
        return find!.array
    }

    const handleFilters = (filters: Array<string> | number, category: string): void => {
        const newFilters: any = filterParams
        newFilters[category] = filters

        if (category === "prices") {
            let priceValues = handlePrice(filters as number)
            newFilters[category] = priceValues
        }
        getProducts({...newFilters, sortByPrice})
        setFilterParams(newFilters)
    }

    const handleSortByPrice = (sortedBy: boolean, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault()

        setSortByPrice(sortedBy)
        getProducts({...filterParams, sortByPrice: sortedBy})
    }

    const filterRef = useRef<HTMLDivElement>(null)

    const showHideFilter = () => filterRef.current?.classList.toggle('active')

    return (
        <Helmet title='Catalogue'>
            <div className='catalog'>
                <div className='catalog__filter' ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget catalog__filter__widget__brand">
                        <div className="catalog__filter__widget__title">
                            Brand
                        </div>
                        <div className="catalog__filter__widget__content">
                            <div className='catalog__filter__widget__content__item'>
                                <CheckBox list={perfumer}
                                    handleFilters={(filters) => handleFilters(filters, "perfumers")} />
                            </div>
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Gender
                        </div>
                        <div className="catalog__filter__widget__content">
                            <div className='catalog__filter__widget__content__item'>
                                <CheckBox list={gender}
                                    handleFilters={(filters) => handleFilters(filters, "genders")} />
                            </div>
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Price
                        </div>
                        <div className="catalog__filter__widget__content">
                            <CheckBoxRadio list={price}
                                handleFilters={(filters) => handleFilters(filters, "prices")} />
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <button onClick={() => showHideFilter()}>Filter</button>
                </div>
                <Route exact component={() => 
                <div className='catalog__content'>
                    <InfinityList dataProp={perfumes}/>
                </div>} />
                
            </div>
        </Helmet>
    )
}

export default Catalog

const perfumer: Array<{ name: string }> = [
    {"name": "Burberry"},
    {"name": "Bvlgari"},
    {"name": "Calvin Klein"},
    {"name": "Carolina Herrera"},
    {"name": "Chanel"},
    {"name": "Creed"},
    {"name": "Dior"},
    {"name": "Dolce&Gabbana"},
    {"name": "Giorgio Armani"},
    {"name": "Gucci"},
    {"name": "Hermes"},
    {"name": "Hugo Boss"},
    {"name": "Jean Paul Gaultier"},
    {"name": "Lancome"},
    {"name": "Paco Rabanne"},
    {"name": "Prada"},
    {"name": "Tom Ford"},
    {"name": "Versace"},
]

const gender: Array<{ name: string }> = [
    {"name": "male"},
    {"name": "female"},
]

const price: Array<PerfumePrice> = [
    {"id": 1, "name": "any", "array": []},
    {"id": 2, "name": "15 - 25 $", "array": [15, 25]},
    {"id": 3, "name": "25 - 40 $", "array": [25, 40]},
    {"id": 4, "name": "40 - 90 $", "array": [40, 90]},
    {"id": 5, "name": "90 - 175+ $", "array": [90, 250]}
]