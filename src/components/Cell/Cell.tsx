import React from 'react';
import styles from './Cell.module.css';
import { CellStatus } from '../../models/cell-status';

interface CellProps {
    alive: CellStatus;
}

export const Cell = ({ alive }: CellProps) => {
    return (
        <div className={`${styles.cell} ${alive ? styles.alive : styles.dead}`} />
    );
};
