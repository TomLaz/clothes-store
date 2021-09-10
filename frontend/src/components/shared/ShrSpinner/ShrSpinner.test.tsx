import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrSpinner from './ShrSpinner';

describe( 'ShrSpinner', () => {
    test( 'should render without error', () => {
        const wrapper = render( <ShrSpinner /> );
        const spinner = wrapper.baseElement.querySelector ( '.shr-spinner' );
        expect( spinner ).toBeInTheDocument();
    });
});
