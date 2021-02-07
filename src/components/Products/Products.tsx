import React, { useContext, useEffect, useState } from 'react';
import ShrProduct from '../shared/ShrProduct/ShrProduct';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { Checkbox, CircularProgress, FormControlLabel } from '@material-ui/core';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import './Products.scss';
import { Product } from '../../providers/Global/Global.model';

const Products: React.FC = () => {
    const { data: { filters, products, filteredOptions }} = useContext( GlobalContext );
    const [ checkedFilters, setCheckedFilters ] = useState<any>({});
    const [ filteredProducts, setFilteredProducts ] = useState<Product[]>( [] );

    useEffect( (): void => {
        if ( filters.length > 0 && filters.length !== Object.keys( checkedFilters ).length ) {
            const elementsChecked: any = {};
            filters.forEach( ( item ) => {
                if ( filteredOptions.some( ( res: string ) => res.toLowerCase() === item.name.toLowerCase() ) ) {
                    elementsChecked[ item.name.toLowerCase() ] = true;
                } else {
                    elementsChecked[ item.name.toLowerCase() ] = false;
                }
            });
            setCheckedFilters( elementsChecked );
        }

        if ( filters.length > 0 &&
            Object.keys( checkedFilters ).length > 0 &&
            products.length > 0 &&
            Object.values( checkedFilters ).some( ( check ) => check ) ) {
            const tempFilteredProducts = [ ...filteredProducts ];
            filters.forEach( ( item ) => {
                // console.log( 'checkedFilters[ item.name ]: ', checkedFilters[ item.name.toLowerCase() ] );
                // console.log( 'checkedFilters: ', checkedFilters );
                // console.log( 'item.name: ', item.name.toLowerCase() );

                if ( checkedFilters[ item.name.toLowerCase() ] ) {
                    // console.log( 'entro al checkedFilters' );
                    products.forEach( ( prod ) => {
                        if ( item.products.includes( prod.id ) && !filteredProducts.includes( prod ) ) {
                            // console.log( 'filteredProducts dentro del if: ', filteredProducts );
                            tempFilteredProducts.push( prod );
                            // console.log( 'tempFilteredProducts: ', tempFilteredProducts );
                        }
                    });
                }
            });
            setFilteredProducts( tempFilteredProducts );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filters, filteredOptions, products, checkedFilters ] );

    // console.log( 'products: ', products );
    // console.log( 'filteredProducts: ', filteredProducts );
    console.log( 'filters: ', filters );
    console.log( 'checkedFilters: ', checkedFilters );

    const onCheckedChange = ( name: string ): void => {
        checkedFilters[ name.toLowerCase() ] = !checkedFilters[ name.toLowerCase() ];
        setCheckedFilters( checkedFilters );
    };

    return (
        <div className='products'>
            <ShrHeader />
            <div className='products__box'>
                { filters.length > 0 ?
                    <div className='products__categories'>
                        {filters.map( ( item, index ) => {
                            console.log( 'checkedFilters dentr: ', checkedFilters );
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={checkedFilters[item.name.toLowerCase()]}
                                            onChange={(): void => onCheckedChange( item.name )}
                                            color='default'
                                            value={item.name} />
                                    }
                                    label={item.name}
                                />
                            );
                        })}
                    </div> :
                    <></>
                }
                { !!products.length && filteredProducts.length === 0 ?
                    <div className='products__gallery'>
                        {
                            products.slice( 0, 9 ).map( ( product ) => {
                                return (
                                    <ShrProduct product={product} key={product.id} />
                                );
                            })
                        }
                    </div> :
                    filteredProducts.length > 0 ?
                        <div className='products__gallery'>
                            {
                                filteredProducts.slice( 0, 9 ).map( ( product ) => {
                                    return (
                                        <ShrProduct product={product} key={product.id} />
                                    );
                                })
                            }
                        </div> :
                        <div className='products__progress'>
                            <CircularProgress />
                        </div>
                }
            </div>
            <ShrFooter />
        </div>
    );
};

export default Products;
