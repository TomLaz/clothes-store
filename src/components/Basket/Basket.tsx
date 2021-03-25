import React, { useContext, useState } from 'react';
import './Basket.scss';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import { GlobalContext } from '../../providers/Global/Global.provider';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductDetail from '../ProductDetail/ProductDetail';
import i18n from '../../i18n';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import { ProductProperties } from '../../providers/Global/Global.model';
import NumberUtils from '../../utils/numberUtils';

const Basket: React.FC = () => {
    const { data: { currentUser, products, basketProducts },
        updateBasketProductsCollection } = useContext( GlobalContext );
    const [ removeId, setRemoveId ] = useState( '' );

    let total = 0;
    basketProducts !== undefined && basketProducts.length > 0 && basketProducts.forEach( ( prod: ProductProperties ) => {
        const price = products.filter( data => data.id === prod.productId ).length > 0 ?
            Number( products.find( data => data.id === prod.productId )?.price ) :
            0;
        const totalPrice = price * Number( prod.quantity );
        total += totalPrice;
    });

    const removeProductHandler = ( id: string ): void => {
        setRemoveId( id );
    };

    const onConfirmRemoveHandler = (): void => {
        const prods = JSON.parse( JSON.stringify( basketProducts ) )
            .filter( ( prod: ProductProperties ) => prod.id.toString() !== removeId.toString() );

        updateBasketProductsCollection( prods );
        setRemoveId( '' );
    };

    return (
        <ShrLayout>
            <div className='basket'>
                {
                    ( currentUser.uid !== undefined &&
                        basketProducts !== undefined ) ?
                        <>
                            <h1 className='basket__title'>
                                {i18n.t( 'global.basket' )}
                            </h1>
                            <div className='basket__products'>
                                {
                                    basketProducts.length > 0 &&
                                        basketProducts.map( ( product: ProductProperties, index: number ) => (
                                            <ProductDetail
                                                key={index}
                                                imgUrl={products.find( data => data.id === product.productId )?.imgUrl || ''}
                                                imgAlt={products.find( data => data.id === product.productId )?.title || ''}
                                                title={products.find( data => data.id === product.productId )?.title || ''}
                                                productSize={product.size}
                                                productQty={product.quantity}
                                                productUnitPrice={products
                                                    .find( data => data.id === product.productId )?.price.toFixed( 2 ).toString() || '0'}
                                                productPrice={!!products.find( data => data.id === product.productId )?.price ?
                                                    ( Number( products.find( data => data.id === product.productId )?.price ) *
                                                    Number( product.quantity ) ).toFixed( 2 ).toString() : '0'
                                                }
                                                onRemoveProductHandler={(): void => removeProductHandler( product.id )}/>
                                        ) )
                                }
                                {
                                    !!!total &&
                                    currentUser.uid !== undefined &&
                                        <div className='basket__empty'>
                                            <div className='basket__empty-title'>
                                                {i18n.t( 'basket.empty' )}
                                            </div>
                                        </div>
                                }
                                <div className='basket__total'>
                                    <div className='basket__total-title'>{i18n.t( 'basket.total' )}</div>
                                    <div className='basket__total-price'>
                                        {NumberUtils.getCurrency( Number( total.toFixed( 2 ) ) )}
                                    </div>
                                </div>
                            </div>
                        </> :
                        <ShrSpinner />
                }
                <Dialog
                    className='basket__dialog'
                    open={removeId !== ''}
                    onClose={(): void => setRemoveId( '' ) }
                    aria-labelledby={i18n.t( 'basket.delete-product' )}
                    aria-describedby={i18n.t( 'basket.delete-check' )}
                >
                    <DialogTitle>
                        {i18n.t( 'basket.delete-product' )}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.t( 'basket.delete-check' )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className='basket__cancel-remove'
                            onClick={(): void => setRemoveId( '' )}
                            color='primary'>
                            {i18n.t( 'basket.cancel' )}
                        </Button>
                        <Button
                            className='basket__confirm-remove'
                            onClick={onConfirmRemoveHandler}
                            color='primary'>
                            {i18n.t( 'basket.agree' )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ShrLayout>
    );
};

export default Basket;
