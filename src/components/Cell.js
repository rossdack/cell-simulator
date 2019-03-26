import React, { useState, useEffect } from 'react';

class Cell extends React.Component {
    // const [condition = false, setCondition] = useState(0);
    //
    // return (
    //     <div>
    //         <p>You clicked {condition} times</p>
    //         <button onClick={() => setCondition(!condition )}>
    //             C
    //         </button>
    //     </div>
    // );


    clickHandler() {
        this.props.clickHandler(this.props.id);
    }

    render() {
        return (
            <div className={`cell -${this.props.isAlive}`}
                 id={this.props.id}
                 key={this.props.id}
                 onClick={() => this.clickHandler()}
            />
        );
    }

}

export default Cell;