import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Products from './Products';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'Products', () => {
    let productsProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( globalProviderData: GlobalProviderData ): RenderResult => {
        productsProviderMock = getGlobalProviderMockData( globalProviderData );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={productsProviderMock}>
                        <Products />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
    });

    describe( 'Render', () => {
        test( 'should render without error', () => {
            const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
            providerDataProps.filteredOptions = [ 'Mens' ];

            wrapper = getRender( providerDataProps );
            const component = wrapper.baseElement.querySelector( '.products' );
            expect( component ).toBeInTheDocument();
        });

        test( 'should render Spinner component', () => {
            const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
            providerDataProps.filters.length = 0;

            wrapper = getRender( providerDataProps );
            const spinner = wrapper.baseElement.querySelector( '.shr-spinner' );
            expect( spinner ).toBeInTheDocument();
        });
    });

    describe( 'Update checked filters', () => {
        test( 'should call updateCheckedFilters on filter clicked', () => {
            const providerDataProps = { ...getDefaultGlobalProviderDataProps() };
            providerDataProps.checkedFilters = {
                mens: true,
                womens: false
            };
            wrapper = getRender( providerDataProps );
            const checkboxElements = wrapper.baseElement.querySelectorAll( '.products__categories .MuiCheckbox-root' );
            expect( checkboxElements[1] ).toBeInTheDocument();
            if ( checkboxElements[1] ) {
                fireEvent.click( checkboxElements[1] );
            }

            expect( productsProviderMock.updateCheckedFilters ).toHaveBeenCalled();
        });
    });

    describe( 'Selected option on dropdown', () => {
        const providerDataProps = { ...getDefaultGlobalProviderDataProps() };
        providerDataProps.checkedFilters = {
            mens: true,
            womens: false
        };

        test( 'should change dropdown selected filter to first option', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[0] ).toBeInTheDocument();
            if ( dropdownOptions[0] ) {
                fireEvent.click( dropdownOptions[0] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[0].textContent );
        });

        test( 'should change dropdown filter to second option', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[1] ).toBeInTheDocument();
            if ( dropdownOptions[1] ) {
                fireEvent.click( dropdownOptions[1] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[1].textContent );
        });

        test( 'should change dropdown filter to third option', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[2] ).toBeInTheDocument();
            if ( dropdownOptions[2] ) {
                fireEvent.click( dropdownOptions[2] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[2].textContent );
        });

        test( 'should change dropdown filter to fourth option', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[3] ).toBeInTheDocument();
            if ( dropdownOptions[3] ) {
                fireEvent.click( dropdownOptions[3] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[3].textContent );
        });
    });

    describe( 'Products filtered on dropdown', () => {
        const providerDataProps = { ...getDefaultGlobalProviderDataProps() };
        providerDataProps.checkedFilters = {
            mens: true,
            womens: false
        };
        providerDataProps.filteredProducts = getDefaultGlobalProviderDataProps().products;
        providerDataProps.filteredOptions.push( providerDataProps.categories[0].name );

        test( 'should change dropdown filter to first option on products filtered', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[0] ).toBeInTheDocument();
            if ( dropdownOptions[0] ) {
                fireEvent.click( dropdownOptions[0] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[0].textContent );
        });

        test( 'should change dropdown filter to second option on products filtered', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[1] ).toBeInTheDocument();
            if ( dropdownOptions[1] ) {
                fireEvent.click( dropdownOptions[1] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[1].textContent );
        });

        test( 'should change dropdown filter to third option on products filtered', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[2] ).toBeInTheDocument();
            if ( dropdownOptions[2] ) {
                fireEvent.click( dropdownOptions[2] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[2].textContent );
        });

        test( 'should change dropdown filter to fourth option on products filtered', () => {
            wrapper = getRender( providerDataProps );
            let dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown ).toBeInTheDocument();
            if ( dropdown ) {
                fireEvent.mouseDown( dropdown );
            }

            const dropdownOptions = document.body.querySelectorAll( '.products__dropdown-option' );
            expect( dropdownOptions[3] ).toBeInTheDocument();
            if ( dropdownOptions[3] ) {
                fireEvent.click( dropdownOptions[3] );
            }

            dropdown = wrapper.baseElement.querySelector( '.products__dropdown-select .MuiSelect-select' );
            expect( dropdown?.textContent ).toBe( dropdownOptions[3].textContent );
        });
    });
});
