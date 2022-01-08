import React, { FC, useEffect, useRef, useState } from 'react'
import { Perfume } from '../types/types'
import Grid from './Grid'
import ProductCard from './ProductCard'

type PropTypes = {
    dataProp: Array<Perfume>
}

const InfinityList: FC<PropTypes> = ({ dataProp }) => {

    const perLoad = 6

    const listRef = useRef<HTMLDivElement>(null)
    
    const [data, setData] = useState<Perfume[]>([])

    const [load, setLoad] = useState(true)
    
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setData(dataProp.slice(0, perLoad))
        setIndex(1)
    }, [dataProp])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (listRef && listRef.current) {
                if (window.scrollY+ window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
                    console.log("bottom reach")
                    setLoad(true)
                }
            }
        })
    }, [listRef])

    useEffect(() => {
        const getItems = () => {
            const pages = Math.floor(data.length / perLoad)
            const maxIndex = dataProp.length % perLoad === 0 ? pages : pages + 1

            if (load && index <= maxIndex) {
                const start = perLoad * index
                const end = start + perLoad

                setData(data.concat(dataProp.slice(start, end)))
                setIndex(index + 1)
            }
        }
        getItems()
        setLoad(false)
    }, [load, index, data, dataProp])

    return (
        <div ref={listRef}>
            <Grid
                colProp={3}
                mdColProp={2}
                smColProp={1}
                gap={20}
            >
                {
                    data.map((item, index) => (
                        <ProductCard
                            key={item.id}
                            perfume={item}
                            link={"/product"}
                        />
                    ))
                }
            </Grid>
        </div>
    )
}

export default InfinityList
