import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {Grid, GridProps} from './Grid';
import { Cell } from '../Cell/Cell';


describe('Grid', () => {
    let sut: ShallowWrapper;
    let mockProps: GridProps;

    beforeEach(() => {
        mockProps = {
            tickInterval: 2000,
            size: 3
        };

        sut = shallow(<Grid {...mockProps} />);
    });

    it('should render grid', () => {
        expect(sut.find('.grid')).toHaveLength(1);
    });

    it('should render grid with number of rows as provided size', () => {
        expect(sut.find('.row')).toHaveLength(mockProps.size);
    });

    it('should render grid with number of columns in a row as provided size', () => {
        expect(sut.find('.row').first().find(Cell)).toHaveLength(mockProps.size);
    });
});
