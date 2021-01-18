import React from 'react'

function OptionUserIdToName({elem}) {

    const userId = elem[0];
    const userName = elem[1].name;

    return (
        <>
            <option value={userId}>{userName}</option>
        </>
    )
}

export default OptionUserIdToName;
