import React, { FC, useState } from 'react'

type PropTypes = {
    handleFilters: (filters: Array<string>) => void
    list: Array<{ name:string }>    
}

const CheckBox: FC<PropTypes> = ({ handleFilters, list }) => {

    const [checked, setChecked] = useState<Array<string>>([])

    const handleToggle = (value: string): void => {
        const currentIndex: number = checked.indexOf(value)
        const newChecked: Array<string> = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        handleFilters(newChecked)
    }

    const renderCheckboxLists = () => list && list.map((value: { name: string }, index: number) => (
        <div key={index} className='catalog__filter__widget__content__item'>
            <label className="custom-checkbox">
                <input
                    onChange={() => handleToggle(value.name)}
                    type="checkbox"
                    checked={checked.indexOf(value.name) !== -1}/>
                <span className="custom-checkbox__checkmark">
                    <i className="bx bx-check"></i>
                </span>
                {value.name}
            </label>
        </div>
    ));

    return (
        <div>
            {renderCheckboxLists()}
        </div>
    )
}

export default CheckBox
