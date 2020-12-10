import React from 'react'

function Reponse({value, onReponseSelect}) {
    return (
        <li className="reponse">
            <input type="radio" id={value} value={value} name="reponse" onChange={()=>onReponseSelect(value)}/>
            <label htmlFor={value}>{value}</label>
        </li>
    )
}

export default Reponse
