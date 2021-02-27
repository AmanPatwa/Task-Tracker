import React from 'react'
import PropTypes from 'prop-types'


const Button = (props) => {

    // const onClick = (e) => {
    //     console.log('click');
    // }

    return (
        <button onClick={props.onClick} style={{backgroundColor:props.color}} className='btn'>{props.text}</button>
    )
}

Button.defaultProps = {
    color: 'stealblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
