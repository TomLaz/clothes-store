import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrSelect from './ShrSelect';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';

describe( 'ShrSelect', () => {
    let shrSelectProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const shrSelectProps = {
        title: 'title',
        selected: 'selected',
        onOptionChange: jest.fn(),
        options: [ 'a', 'b' ]
    };

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        shrSelectProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrSelectProviderMock}>
                        <ShrSelect {...shrSelectProps} />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.shr-select' );
        expect( component ).toBeInTheDocument();
    });
});
