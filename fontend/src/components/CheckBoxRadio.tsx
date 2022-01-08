import React, { ChangeEvent, FC, useState } from 'react'
import { PerfumePrice } from '../types/types'

type PropTypes = {
    handleFilters: (filters: number) => void
    list: Array<PerfumePrice>
}

const CheckBoxRadio: FC<PropTypes> = ({ handleFilters, list }) => {

    const [priceValue, setPriceValue] = useState<number>(0)

    const renderRadioBox = () => (
        list && list.map((value: PerfumePrice) => (
            <div key={value.id} className="catalog__filter__widget__content__item">
                <label className="custom-checkbox">
                    <input
                        type="radio"
                        name="price"
                        value={value.id}/>
                    <span className="custom-checkbox__checkmark">
                        <i className="bx bx-check"></i>
                    </span>
                    {value.name}
                </label>
            </div>
        ))
    )

    const handleChange = (event: ChangeEvent<HTMLLIElement>): void => {
        setPriceValue(event.target.value)
        handleFilters(event.target.value)
    }

    return (
        <li onChange={handleChange} value={priceValue}>
            {renderRadioBox()}
        </li>
    )
}

export default CheckBoxRadio
