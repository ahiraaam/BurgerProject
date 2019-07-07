import React from 'react';
import classes from './Button.css';

const button  = (props) => {
    return(
        //El button type debe ser Danger/Success
        <button className={[classes.Button,classes[props.btnType]].join(' ')}
        onClick={props.clicked }>
            {props.children}
        </button>
    )
}

export default button;