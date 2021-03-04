import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, MenuItem, Select } from '@material-ui/core';
import i18n from '../../i18n';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrProduct from '../shared/ShrProduct/ShrProduct';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import './Products.scss';

const Products: React.FC = () => {
    const { data: { filters, products, filteredOptions, checkedFilters, filteredProducts },
        updateCheckedFilters, updateFilteredProducts } = useContext( GlobalContext );
    const [ sortSelected, setSortSelected ] = useState( 'date' );

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

    const onSortChange = ( e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }> ): void => {
        setSortSelected( typeof e.target.value === 'string' ? e.target.value : '' );
    };

    return (
        <ShrLayout>
            <div className='products'>
                {
                    ( filters.length > 0 &&
                    products.length ) > 0 ?
                        <>
                            <div className='products__sort'>
                                <p className='products__sort-title'>
                                    {i18n.t( 'products.dropdown.sort' )}
                                </p>
                                <FormControl className='products__dropdown'>
                                    <Select
                                        fullWidth
                                        displayEmpty
                                        className='products__dropdown-select'
                                        value={sortSelected}
                                        onChange={onSortChange}>
                                        <MenuItem
                                            className='products__dropdown-option'
                                            value='name'>
                                            {i18n.t( 'products.dropdown.all' )}
                                        </MenuItem>
                                        <MenuItem
                                            className='products__dropdown-option'
                                            value='lowest'>
                                            {i18n.t( 'products.dropdown.lowest' )}
                                        </MenuItem>
                                        <MenuItem
                                            className='products__dropdown-option'
                                            value='highest'>
                                            {i18n.t( 'products.dropdown.highest' )}
                                        </MenuItem>
                                        <MenuItem
                                            className='products__dropdown-option'
                                            value='date'>
                                            {i18n.t( 'products.dropdown.date' )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='products__box'>
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
                                                sortSelected === 'name' &&
                                                    products.sort( ( a, b ) => ( a.title > b.title ) ? 1 : -1 )
                                                        .map( ( product ) => {
                                                            return (
                                                                <ShrProduct
                                                                    product={product}
                                                                    key={product.id} />
                                                            );
                                                        })
                                            }
                                            {
                                                sortSelected === 'lowest' &&
                                                    products.sort( ( a, b ) => ( a.price > b.price ) ? 1 : -1 )
                                                        .map( ( product ) => {
                                                            return (
                                                                <ShrProduct
                                                                    product={product}
                                                                    key={product.id} />
                                                            );
                                                        })
                                            }
                                            {
                                                sortSelected === 'highest' &&
                                                    products.sort( ( a, b ) => ( a.price < b.price ) ? 1 : -1 )
                                                        .map( ( product ) => {
                                                            return (
                                                                <ShrProduct
                                                                    product={product}
                                                                    key={product.id} />
                                                            );
                                                        })
                                            }
                                            {
                                                sortSelected === 'date' &&
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
                                                    sortSelected === 'name' &&
                                                    filteredProducts.sort( ( a, b ) => ( a.title > b.title ) ? 1 : -1 )
                                                        .map( ( product, index ) => {
                                                            return (
                                                                <ShrProduct
                                                                    product={product}
                                                                    key={index} />
                                                            );
                                                        })
                                                }
                                                {
                                                    sortSelected === 'lowest' &&
                                                    filteredProducts.sort( ( a, b ) => ( a.price > b.price ) ? 1 : -1 )
                                                        .map( ( product, index ) => {
                                                            return (
                                                                <ShrProduct
                                                                    product={product}
                                                                    key={index} />
                                                            );
                                                        })
                                                }
                                                {
                                                    sortSelected === 'highest' &&
                                                    filteredProducts.sort( ( a, b ) => ( a.price < b.price ) ? 1 : -1 )
                                                        .map( ( product, index ) => {
                                                            return (
                                                                <ShrProduct
                                                                    product={product}
                                                                    key={index} />
                                                            );
                                                        })
                                                }
                                                {
                                                    sortSelected === 'date' &&
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
                            </div>
                        </> :
                        <ShrSpinner />
                }
            </div>
        </ShrLayout>
    );
};

export default Products;
