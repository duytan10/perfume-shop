import React, { FC } from 'react'

type PropTypes =  {
    colProp: number
    mdColProp: number
    smColProp: number
    gap: number
}

const Grid: FC<PropTypes> = ({colProp, mdColProp, smColProp, gap, children}) => {

    const style = {
        gap: gap ? `${gap}px` : '0'
    }

    const col = colProp ? `grid-col-${colProp}` : ''
    const mdCol = mdColProp ? `grid-col-md-${mdColProp}` : ''
    const smCol = smColProp ? `grid-col-sm-${smColProp}` : ''


    return (
        <div className={`grid ${col} ${mdCol}  ${smCol}`} style={style}>
            {children}
        </div>
    )
}

export default Grid