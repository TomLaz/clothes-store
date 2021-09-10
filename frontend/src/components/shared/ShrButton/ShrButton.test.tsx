import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from './ShrButton';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';

describe( 'ShrButton', () => {
    let shrButtonProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const shrButtonProps = {
        fullWidth: true,
        variant: ButtonVariant.outlined,
        color: ButtonColor.primary,
        disabled: false,
        type: ButtonType.button,
        title: 'title',
        size: ButtonSize.large,
        action: jest.fn()
    };

    const getRender = (): RenderResult => {
        shrButtonProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrButtonProviderMock}>
                        <ShrButton { ...shrButtonProps } />
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
        const component = wrapper.baseElement.querySelector( '.shr-button' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should render submit button type without error', () => {
        shrButtonProps.type = ButtonType.submit;
        wrapper = getRender();
        const component = wrapper.baseElement.querySelector( '.shr-button' );
        expect( component ).toBeInTheDocument();
    });
});
