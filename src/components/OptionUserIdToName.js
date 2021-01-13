import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';

function OptionUserIdToName({elem}) {

    const userId = elem[0];
    const userName = elem[1].name;

    return (
        <>
            {console.log(userName)}
            <option value={userId}>{userName}</option>
        </>
    )
}

export default OptionUserIdToName;
