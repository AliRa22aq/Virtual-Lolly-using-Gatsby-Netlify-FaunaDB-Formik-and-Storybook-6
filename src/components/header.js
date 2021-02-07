import React from 'react'
import './header.css'
import GithubCorner from 'react-github-corner';

const Header = () => {
    return (
        <div className="header" >
            <GithubCorner href="https://github.com/AliRa22aq" />
            <h3> Virtual Lollypop</h3>
            <p> A Lolly that you can share with your loved ones</p>
        </div> 
    )
}

export default Header
