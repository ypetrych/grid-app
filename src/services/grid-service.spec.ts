import { GridService } from './grid-service';
import { CellStatus } from '../models/cell-status';


describe('Grid Service', () => {
    describe('#generateGrid', () => {
        let grid: CellStatus[][];
        const size = 3;

        beforeEach(() => {
            grid = GridService.generateGrid(size);
        });

        it('should generate new grid with number of arrows the same as provided size', () => {
           expect(grid.length).toBe(size);
        });

        it('should generate new grid with arrows with length the same as provided size', () => {
            for (let i = 0; i < size; i++) {
                expect(grid[i].length).toBe(size);
            }
        });
    });

    describe('#updateGrid', () => {
        let grid: CellStatus[][];
        let newGrid: CellStatus[][];

        // In future corner cases should be covered with tests:
        // - cell in the corners of grid
        // - cell on first/last row/column

        describe('alive to alive', () => {
            it('should leave alive cell with 2 neighbours as alive', () => {
                grid = [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(1);
            });

            it('should leave alive cell with 3 neighbours as alive', () => {
                grid = [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(1);
            });
        });

        describe('alive to dead - underpopulation', () => {
            it('should update alive cell with 1 neighbour as dead', () => {
                grid = [
                    [0, 0, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(0);
            });

            it('should update alive cell with 0 neighbours as dead', () => {
                grid = [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0]
                ];

                newGrid = GridService.updateGrid(grid);
                expect(newGrid[1][1]).toBe(0);
            });
        });

        describe('alive to dead - overcrowding', () => {
            it('should update alive cell with 4 neighbours as dead', () => {
                grid = [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 1, 0]
                ];

                newGrid = GridService.updateGrid(grid);
                expect(newGrid[1][1]).toBe(0);
            });

            it('should update alive cell with 5 neighbours as dead', () => {
                grid = [
                    [1, 1, 0],
                    [1, 1, 1],
                    [0, 1, 0]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(0);
            });

            it('should update alive cell with 6 neighbours as dead', () => {
                grid = [
                    [1, 1, 1],
                    [1, 1, 1],
                    [0, 1, 0]
                ];

                newGrid = GridService.updateGrid(grid);
                expect(newGrid[1][1]).toBe(0);
            });

            it('should update alive cell with 7 neighbours as dead', () => {
                grid = [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 0]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(0);
            });

            it('should update alive cell with 8 neighbours as dead', () => {
                grid = [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(0);
            });
        });

        describe('dead to alive - reproduction', () => {
            it('should update dead cell with 3 neighbours as alive', () => {
                grid = [
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 0, 0]
                ];
                newGrid = GridService.updateGrid(grid);

                expect(newGrid[1][1]).toBe(1);
            });
        });
    });
});
