import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrHorizontalImage from './ShrHorizontalImage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';

describe( 'ShrHorizontalImage', () => {
    let shrHorizontalImageProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const shrHorizontalImageProps = {
        title: 'title',
        description: 'description',
        imgName: 'medium_edit.png'
    };

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        shrHorizontalImageProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrHorizontalImageProviderMock}>
                        <ShrHorizontalImage {...shrHorizontalImageProps} />
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
        const component = wrapper.baseElement.querySelector( '.shr-horizontal-image' );
        expect( component ).toBeInTheDocument();
    });
});
