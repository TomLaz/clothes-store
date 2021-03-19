import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrFooter from './ShrFooter';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';

describe( 'ShrFooter', () => {
    let shrFooterProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        shrFooterProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrFooterProviderMock}>
                        <ShrFooter />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
    });

    const providerDataProps = (): GlobalProviderData => {
        const providerDataProps = { ...getDefaultGlobalProviderDataProps() };
        providerDataProps.checkedFilters = {
            mens: true,
            womens: false
        };

        return providerDataProps;
    };

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.shr-footer' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateActiveMenuItem on home category button clicked', () => {
        wrapper = getRender( providerDataProps() );
        const homeCategoryButton = wrapper.baseElement.querySelector( '.shr-footer__category' );
        expect( homeCategoryButton ).toBeInTheDocument();
        if ( homeCategoryButton ) {
            fireEvent.click( homeCategoryButton );
        }

        expect( shrFooterProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
    });

    test( 'should call updateActiveMenuItem on home category button clicked', () => {
        wrapper = getRender( providerDataProps() );
        const categoryButtons = wrapper.baseElement.querySelectorAll( '.shr-footer__category' );
        categoryButtons.forEach( category => {
            if ( category.textContent === '[global.home]' ) {
                fireEvent.click( category );
            }
        });

        expect( shrFooterProviderMock.updateActiveMenuItem ).toHaveBeenCalledWith( 'home' );
    });

    test( 'should call updateActiveMenuItem on favourites category button clicked', () => {
        wrapper = getRender( providerDataProps() );
        const categoryButtons = wrapper.baseElement.querySelectorAll( '.shr-footer__category' );
        categoryButtons.forEach( category => {
            if ( category.textContent === '[shr-footer.favourites]' ) {
                fireEvent.click( category );
            }
        });

        expect( shrFooterProviderMock.updateActiveMenuItem ).toHaveBeenCalledWith( 'favourites' );
    });

    test( 'should call updateActiveMenuItem on products category button clicked', () => {
        wrapper = getRender( providerDataProps() );
        const categoryButtons = wrapper.baseElement.querySelectorAll( '.shr-footer__category' );
        categoryButtons.forEach( category => {
            if ( category.textContent === '[products.title]' ) {
                fireEvent.click( category );
            }
        });

        expect( shrFooterProviderMock.updateActiveMenuItem ).toHaveBeenCalledWith( 'products' );
    });
});
