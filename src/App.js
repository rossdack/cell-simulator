import React, {Component} from 'react';
import './App.css';
import './scss/board.scss';
import './scss/cell.scss';

import Board from './components/Board';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Board />
            </div>
        );
    }
}

export default App;
