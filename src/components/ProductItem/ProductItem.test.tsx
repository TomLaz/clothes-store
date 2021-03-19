import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductItem, { ProductItemType } from './ProductItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'ProductItem', () => {
    let productItemProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const productItemProp: ProductItemType = {
        product: getDefaultGlobalProviderDataProps().products[0]
    };

    const getRender = (): RenderResult => {
        productItemProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={productItemProviderMock}>
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
