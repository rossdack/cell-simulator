import React from 'react';

const Button = props => {
    return (
        <button onClick={props.clickHandler} className={props.className} title={props.title}>{props.text}</button>
    );
};

export default Button;