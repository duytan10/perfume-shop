import React, { FC } from 'react'

const Section: FC = ({children}) => {
    return (
        <div className='section'>
            {children}
        </div>
    )
}

export const SectionTitle: FC = ({children}) => {
    return (
        <div className='section__title'>
            {children}
        </div>
    )
}

export const SectionBody: FC = ({children}) => {
    return (
        <div className='section__body'>
            {children}
        </div>
    )
}

export default Section