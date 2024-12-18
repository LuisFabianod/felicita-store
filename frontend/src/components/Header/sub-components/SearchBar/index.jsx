import './styles.css'
import React from "react"

export const SearchBar = ({placeholder}) => {
    return(
        <div className="search-bar-div">
            <input type="text" name="search-bar" className="search-bar" placeholder={placeholder}/>
            
        </div>
    )
}