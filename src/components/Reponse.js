import React from 'react'

function Reponse({value, onReponseSelect, index}) {
    return (
        <li className="reponse">
            <input type="radio" id={value} value={value} name="reponse" onChange={()=>onReponseSelect(index)}/>
            <label htmlFor={value}>{value}</label>
        </li>
    )
}

export default Reponse
