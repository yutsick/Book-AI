import React from 'react';

function WhatWeDoItem({ item }) {

    return (
        <li className="list-disc">
            <p>
                <strong>{item.textBold} </strong>{item.text}
            </p>
        </li>
    )
}

export default WhatWeDoItem;