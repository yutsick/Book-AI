import React from 'react';

function WhatHappensItem({ item, index }) {
    return (
        <li className="list-disc">
            <p>
                <strong>{item.step} {index + 1}: </strong>{item.text}
            </p>
        </li>
    )
}

export default WhatHappensItem;