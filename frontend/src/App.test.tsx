import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';

describe( 'App', () => {
    const getRender = (): RenderResult => {
        return render( <App /> );
    };

    test( 'Should render without error', () => {
        const wrapper = getRender();
        expect( wrapper.baseElement ).toBeInTheDocument();
    });
});
