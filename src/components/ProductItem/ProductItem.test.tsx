import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductItem, { ProductItemType } from './ProductItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'ProductItem', () => {
    let addProductProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const productItemProp: ProductItemType = {
        product: getDefaultGlobalProviderDataProps().products[0]
    };

    const getRender = (): RenderResult => {
        addProductProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={addProductProviderMock}>
                        <ProductItem { ...productItemProp } />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    test( 'should render without error', () => {
        wrapper = getRender();
        const component = wrapper.baseElement.querySelector( '.product-item' );
        expect( component ).toBeInTheDocument();
    });
});
