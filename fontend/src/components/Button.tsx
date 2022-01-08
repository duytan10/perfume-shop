import React, { FC } from 'react'

interface Props {
    backgroundColor: string
    size: string
    icon: string
    animate: boolean
}

const Button: FC<Props> = (children, props) => {

    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor: 'bg-main'

    const size = props.size ? 'btn-' + props.size : ''

    const animate = props.animate ? 'btn-animate' : ''

    return (
        <button
            className={`btn ${bg} ${size} ${animate}`}
        >
            <span className="btn__txt">{children}</span>
            {
                props.icon ? (
                    <span className="btn__icon">
                        <i className={`${props.icon} bx-tada`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}

export default Button
