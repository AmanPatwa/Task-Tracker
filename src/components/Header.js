import React from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = (props) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            {
                location.pathname === '/' &&
                <Button onClick={props.onAddShow} color={props.onShow ? 'red' : 'green'} text={props.onShow ? 'Close' : 'Add'} />
            }
        </header>
    )
}

export default Header
