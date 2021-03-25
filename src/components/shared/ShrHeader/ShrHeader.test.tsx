import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrHeader from './ShrHeader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';

const mockHistoryPush = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useHistory: (): { push: jest.Mock<any, any>; } => ({
        push: mockHistoryPush
    })
}) );

describe( 'ShrHeader', () => {
    let shrHeaderProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const shrHeaderProps = {
        showSignIn: true,
        showSignUp: true,
        showCategories: true
    };

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        shrHeaderProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrHeaderProviderMock}>
                        <ShrHeader {...shrHeaderProps} />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
    });

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.shr-header' );
        expect( component ).toBeInTheDocument();
    });
});
