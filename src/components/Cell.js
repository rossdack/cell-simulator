import React from 'react';

const Cell = props => {
    return (
        <div className={`cell -${props.isAlive}`}
             id={props.id}
             key={props.id}
             onClick={() => props.clickHandler(props.id)}
        />
    );
};

export default Cell;