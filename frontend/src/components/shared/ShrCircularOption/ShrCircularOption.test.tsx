import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrCircularOption from './ShrCircularOption';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';

describe( 'ShrCircularOption', () => {
    let shrCircularOptionProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const shrCircularOptionPropsProps = {
        size: 'S',
        sizeSelected: 'L',
        onOptionSelected: jest.fn()
    };

    const getRender = (): RenderResult => {
        shrCircularOptionProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrCircularOptionProviderMock}>
                        <ShrCircularOption { ...shrCircularOptionPropsProps } />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        wrapper = getRender();
        const component = wrapper.baseElement.querySelector( '.shr-circular-option__option' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should render selected size type without error', () => {
        shrCircularOptionPropsProps.sizeSelected = 'S';
        wrapper = getRender();
        const component = wrapper.baseElement.querySelector( '.shr-circular-option__active' );
        expect( component ).toBeInTheDocument();
    });
});
