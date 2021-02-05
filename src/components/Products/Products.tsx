import React, { useContext, useEffect, useState } from 'react';
import Product from '../Product/Product';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { CircularProgress } from '@material-ui/core';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import './Products.scss';
import useFirestore from '../../firebase/useFirestore';

const Products: React.FC = () => {
    const globalContext = useContext( GlobalContext );
    const [ filters, setFilters ] = useState<string[]>( [] );

    useEffect( ():void => {
        if ( globalContext.data.categories.length > 0 && !filters.some( r => globalContext.data.categories
            .map( ( item ) => { return item.name; }).indexOf( r ) >= 0 ) ) {
            globalContext.data.categories.forEach( ( item ) => {
                filters.push( item.name.toString() );
            });
            setFilters( filters );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ globalContext.data.categories ] );

    useEffect( ():void => {
        if ( globalContext.data.tempCategories.length > 0 && !filters.some( r => globalContext.data.tempCategories
            .map( ( item ) => { return item.name; }).indexOf( r ) >= 0 ) ) {
            globalContext.data.tempCategories.forEach( ( item ) => {
                filters.push( item.name.toString() );
            });
            setFilters( filters );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ globalContext.data.tempCategories ] );

    console.log( 'filters', filters );

    return (
        <div className='products'>
            <ShrHeader />
            <div className='products__categories'>
                Categories
            </div>
            {
                !!globalContext.data.products.length ?
                    <div className='products__gallery'>
                        {
                            globalContext.data.products.slice( 0, 9 ).map( ( product ) => {
                                return (
                                    <Product product={product} key={product.id} />
                                );
                            })
                        }
                    </div> :
                    <div className='products__progress'>
                        <CircularProgress />
                    </div>
            }
            <ShrFooter />
        </div>
    );
};

export default Products;
