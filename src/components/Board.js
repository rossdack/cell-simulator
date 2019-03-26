import React, {useState, useEffect} from 'react';
import Cell from './Cell';

const XDIMENSION = 20;
const YDIMENSION = 20;
const INTERVAL = 1000;

const NORTH = [-1, 0];
const NORTHEAST = [-1, 1];
const EAST = [0, 1];
const SOUTHEAST = [1, 1];
const SOUTH = [0, 1];
const SOUTHWEST = [1, -1];
const WEST = [1, 0];
const NORTHWEST = [-1, -1];

const DIRS = [NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST];

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boardArray: this.initializeBoard(),
            isRunning: false
        };

        this.cellClickHandler = this.cellClickHandler.bind(this);
    }

    initializeBoard() {
        return Array(YDIMENSION).fill().map(() => Array(XDIMENSION).fill(false));
    }

    resetBoard = () => {
        this.setState({boardArray: this.initializeBoard(), isRunning: false})

        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    };

    playGame = () => {
        this.setState({isRunning: !this.state.isRunning});
        this.doGenerationCycle();
    };

    stopGame = () => {
        this.setState({isRunning: false});

        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    };


    determineNeighbours(board, x, y) {
        let neighbours = 0;

        DIRS.forEach((direction) => {
            let y1 = y + direction[0];
            let x1 = x + direction[1];

            if (x1 >= 0 && x1 < YDIMENSION && y1 >= 0 && y1 < XDIMENSION && board[y1][x1]) {
                neighbours++;
            }
        });

        return neighbours;
    }

    /**
     * Perform a generational cycle
     *
     * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
     * Any live cell with two or three live neighbours lives on to the next generation.
     * Any live cell with more than three live neighbours dies, as if by overpopulation.
     * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     */
    doGenerationCycle() {
        let newBoard = this.initializeBoard();

        for (let y = 0; y < XDIMENSION; y++) {
            for (let x = 0; x < YDIMENSION; x++) {
                let neighbors = this.determineNeighbours(this.state.boardArray, x, y);

                if (this.state.boardArray[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    // if cell dead, but there are three neighbours, generate new cell
                    if (!this.state.boardArray[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.setState({boardArray: newBoard});

        this.timeout = window.setTimeout(() => {
            this.doGenerationCycle();
        }, INTERVAL);
    }

    renderColumns() {
        return this.state.boardArray.map((rows, r) => {
            return (
                <div className="row" key={`${r}`}>
                    {
                        rows.map((value, c) => {
                            return (
                                <Cell
                                    id={`${r},${c}`}
                                    key={`${r},${c}`}
                                    onClick={this.cellClickHandler}
                                    clickHandler={this.cellClickHandler}
                                    isAlive={value}
                                />
                            )
                        })
                    }
                </div>
            )
        })
    }

    /**
     * Update array when a cell is clicked
     * @param item
     */
    cellClickHandler = (item) => {
        var items = item.split(",");
        let arr = this.state.boardArray;

        arr[items[0]][items[1]] = !arr[items[0]][items[1]];

        this.setState({boardArray: arr});
    };

    render() {
        return (
            <>
                <header>
                    Conway's Game of Life
                </header>
                <section>
                    {this.renderColumns()}
                </section>
                <section className="buttons">
                    <button title="Play" onClick={this.playGame} enabled={!this.state.isRunning}>Play</button>
                    <button title="Reset" onClick={this.resetBoard}>Reset</button>
                    <button title="Stop" onClick={this.stopGame}>Stop</button>
                </section>
            </>
        );
    }
}

export default Board;