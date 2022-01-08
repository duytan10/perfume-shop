import React, { FC } from 'react'

type PropTypes = {
    title: string
}

const Helmet: FC<PropTypes> = ({title, children}) => {

    document.title = 'QC Perfume - ' + title

    return (
        <div>
            {children}
        </div>
    )
}

export default Helmet