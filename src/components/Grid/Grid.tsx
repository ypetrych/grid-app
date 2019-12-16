import React from 'react';
import { Cell } from '../Cell/Cell';
import { GridService } from '../../services/grid-service';
import { CellStatus } from '../../models/cell-status';
import styles from './Grid.module.css';

export interface GridProps {
    size: number;
    tickInterval: number;
}

interface GridState {
    grid: CellStatus[][];
}

export class Grid extends React.PureComponent<GridProps, GridState> {
    timer: any;

    constructor(props: GridProps) {
     super(props);
     this.state = {
         grid: GridService.generateGrid(this.props.size)
     };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.updateGrid(), this.props.tickInterval);
    }

    updateGrid() {
        this.setState({
            grid: GridService.updateGrid(this.state.grid)
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    // Usage of indexes as keys is not good because if array will be re-sorted, any item will be added/removed
    // then there is possibility that all items wil be re-rendered.
    // Since the width/height of 2d-array won't be changed in our case then we can use indexes as keys
    render() {
        return (
            <div className={styles.grid}>
                {this.state.grid.map((cellsRow: CellStatus[], i: number) => (
                    <div className={styles.row} key={i}>
                        {cellsRow.map((cell: CellStatus, j: number) => (
                            <Cell alive={cell} key={j} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
