import React, { useContext, useEffect } from 'react';
import ShrProduct from '../shared/ShrProduct/ShrProduct';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { Checkbox, CircularProgress, FormControlLabel } from '@material-ui/core';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import './Products.scss';

const Products: React.FC = () => {
    const { data: { filters, products, filteredOptions, checkedFilters, filteredProducts },
        updateCheckedFilters, updateFilteredProducts } = useContext( GlobalContext );

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

            updateCheckedFilters( elementsChecked );
        }

        if ( filters.length > 0 &&
            Object.keys( checkedFilters ).length > 0 &&
            products.length > 0 &&
            Object.values( checkedFilters ).some( ( check ) => check ) ) {
            const tempFilteredProducts = [ ...filteredProducts ];

            filters.forEach( ( item ) => {
                if ( checkedFilters[ item.name.toLowerCase() ] ) {
                    products.forEach( ( prod ) => {
                        if ( item.products.includes( prod.id ) && !filteredProducts.includes( prod ) ) {
                            tempFilteredProducts.push( prod );
                        }
                    });
                }
            });

            updateFilteredProducts( tempFilteredProducts );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filters, filteredOptions, products, checkedFilters ] );

    const onCheckedChange = ( name: string ): void => {
        const copyCheckedFilters = JSON.parse( JSON.stringify( checkedFilters ) );
        copyCheckedFilters[ name.toLowerCase() ] = !checkedFilters[ name.toLowerCase() ];
        updateCheckedFilters( copyCheckedFilters );

        let temp = 0;
        filters.forEach( ( item ) => {
            if ( !filteredOptions.some( ( res: string ) => res.toLowerCase() === item.name.toLowerCase() ) ) {
                temp += 1;
            }
        });

        if ( temp > 0 ) {
            updateFilteredProducts( [] );
        }
    };

    return (
        <div className='products'>
            <ShrHeader />
            <div className='products__box'>
                {
                    ( filters.length > 0 &&
                    products.length ) > 0 ?
                        <>
                            {/* BARRA LATERAL IZQ, FILTROS */}
                            {
                                Object.keys( checkedFilters ).length > 0 &&
                                    <div className='products__categories'>
                                        {filters.map( ( item, index ) => {
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
                                    </div>
                            }
                            {/* LADO DERECHO, CUERPO DE IMAGENES */}
                            {
                                filteredProducts.length === 0 ?
                                    <div className='products__gallery'>
                                        {
                                            products.map( ( product ) => {
                                                return (
                                                    <ShrProduct
                                                        product={product}
                                                        key={product.id} />
                                                );
                                            })
                                        }
                                    </div> :
                                    filteredProducts.length > 0 &&
                                        <div className='products__gallery'>
                                            {
                                                filteredProducts.map( ( product, index ) => {
                                                    return (
                                                        <ShrProduct
                                                            product={product}
                                                            key={index} />
                                                    );
                                                })
                                            }
                                        </div>
                            }
                        </> :
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
