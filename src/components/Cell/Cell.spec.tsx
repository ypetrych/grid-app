import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Cell } from './Cell';


describe('Cell', () => {
    let sut: ShallowWrapper;

    it('should render alive cell if it is alive', () => {
        sut = shallow(<Cell alive={1}/>);
        expect(sut.find('.cell').hasClass('alive')).toBe(true);
        expect(sut.find('.cell').hasClass('dead')).toBe(false);
    });

    it('should render dead cell if it is not alive', () => {
        sut = shallow(<Cell alive={0}/>);
        expect(sut.find('.cell').hasClass('dead')).toBe(true);
        expect(sut.find('.cell').hasClass('alive')).toBe(false);
    });
});
