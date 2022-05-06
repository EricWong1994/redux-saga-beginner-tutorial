import React, { Component } from 'react';

const Learn = ({store}) => {
    const onTakeEveryTest = () => {
        store.dispatch({
            type: 'INCREMENT',
            user: {
                username: 'eric',
                password: '119'
            }
        })
    }

    return (
        <div>
            Learn
            <button onClick={onTakeEveryTest}>TakeEveryTest</button>{' '}
        </div>
    )
}

export default Learn;
