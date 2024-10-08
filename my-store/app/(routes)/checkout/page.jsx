import React from 'react'

export default function page() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const jwt = sessionStorage.getItem('jwt')

    return (
        <div>
            <h2 className='bg'></h2>
        </div>
    )
}
