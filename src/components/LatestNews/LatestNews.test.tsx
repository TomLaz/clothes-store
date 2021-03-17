import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LatestNews from './LatestNews';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'LatestNews', () => {
    let addProductProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = (): RenderResult => {
        addProductProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={addProductProviderMock}>
                        <LatestNews />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    beforeEach( () => {
        wrapper = getRender();
    });

    test( 'should render without error', () => {
        const component = wrapper.baseElement.querySelector( '.latest-news' );
        expect( component ).toBeInTheDocument();
    });
});
