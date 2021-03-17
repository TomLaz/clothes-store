import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Products from './Products';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'Products', () => {
    let addProductProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( globalProviderData?: GlobalProviderData ): RenderResult => {
        addProductProviderMock = getGlobalProviderMockData( globalProviderData || getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={addProductProviderMock}>
                        <Products />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    beforeEach( () => {
        wrapper = getRender();
    });

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        const component = wrapper.baseElement.querySelector( '.products' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateCheckedFilters on filter clicked', () => {
        cleanup();
        const providerDataProps = { ...getDefaultGlobalProviderDataProps() };
        providerDataProps.checkedFilters = {
            mens: true,
            womens: false
        };
        wrapper = getRender( providerDataProps );
        const component = wrapper.baseElement.querySelector( '.products__categories' );
        const checkboxElements = component.querySelectorAll( '.MuiCheckbox-root' );
        expect( checkboxElements[1] ).toBeInTheDocument();
        if ( checkboxElements[1] ) {
            fireEvent.click( checkboxElements[1] );
        }

        expect( addProductProviderMock.updateCheckedFilters ).toHaveBeenCalled();
    });
});
