import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect';

describe( 'Home', () => {
    const getRender = (): RenderResult => {
        return render( <Home /> );
    };

    test( 'Should render without error', () => {
        const wrapper = getRender();
        expect( wrapper.baseElement ).toBeInTheDocument();
    });
});
