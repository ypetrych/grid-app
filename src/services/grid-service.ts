import { CellStatus } from '../models/cell-status';

export class GridService {
    private static allowedNumberOfNeighboursOfAliveCell: number[] = [2, 3];
    private static allowedNumberOfNeighboursOfDeadCell: number[] = [3];

    public static generateGrid = (size: number): CellStatus[][] => {
        const grid: CellStatus[][] = [];
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = Math.round(Math.random());
            }
        }
        return grid;
    };

    public static updateGrid = (oldGrid: CellStatus[][]): CellStatus[][] => {
        const newGrid: any = [];
        oldGrid.forEach((oldRow: Array<CellStatus>, y: number) => {
            const newRow: Array<any> = [];
            oldRow.forEach((oldCell: CellStatus, x: number) => {
                const sumOfNeighbours = GridService.calculateSumOfNeighbours(oldGrid, x, y);
                newRow.push(GridService.isAlive(oldCell, sumOfNeighbours) ? CellStatus.Alive : CellStatus.Dead);
            });
            newGrid.push(newRow);
        });
        return newGrid;
    };

    private static calculateSumOfNeighbours = (grid: CellStatus[][], x: number, y: number) => {
        const neighbours =[
            [x-1, y-1], [x-1, y], [x-1, y+1],
            [x, y-1], [x, y+1],
            [x+1, y-1], [x+1, y], [x+1, y+1]
        ];

        return neighbours.reduce((total, neighbour) => total + GridService.getCellValue(grid, neighbour), 0);
    };

    private static isAlive = (cell: CellStatus, sumOfNeighbours: number): boolean => {
        if (cell && GridService.allowedNumberOfNeighboursOfAliveCell.includes(sumOfNeighbours)) {
            return true;
        }
        return !cell && GridService.allowedNumberOfNeighboursOfDeadCell.includes(sumOfNeighbours);
    };

    private static getCellValue = (grid: CellStatus[][], [x, y]: number[] ) => {
        if (x < 0 || y < 0) {
            return 0;
        }
        return grid[y] && grid[y][x] ? grid[y][x] : 0;
    };
}

