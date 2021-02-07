import React from 'react'
import Footer from './footer'
import Header from './header'

const Cover = ({children}) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Cover
