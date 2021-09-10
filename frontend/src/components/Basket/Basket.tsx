import React, { useContext, useState } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import i18n from '../../i18n';
import { BasketProductI } from '../../models/Global.model';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import NumberUtils from '../../utils/numberUtils';
import ProductDetail from '../ProductDetail/ProductDetail';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import './Basket.scss';

const Basket: React.FC = () => {
    const { data: { jwt, email, products, basket }, updateBasket } = useContext( GlobalContext );
    const [ removeId, setRemoveId ] = useState( '' );

    let total = 0;
    !!basket && basket.products.length > 0 && basket.products.forEach( ( prod: any ) => {
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
        const basketProds = JSON.parse( JSON.stringify( basket ) );
        const productsFiltered = basketProds.products.filter( ( prod: BasketProductI ) => prod.productId !== removeId.toString() );
        basketProds.products = productsFiltered;

        updateBasket( basketProds );
        GlobalService.updateBasket( jwt || '', basketProds );
        setRemoveId( '' );
    };

    return (
        <ShrLayout>
            <div className='basket'>
                {
                    email === null ?
                        <ShrSpinner /> :
                        <>
                            <h1 className='basket__title'>
                                {i18n.t( 'global.basket' )}
                            </h1>
                            <div className='basket__products'>
                                {
                                    basket &&
                                    basket.products.length > 0 &&
                                        basket.products.map( ( product: BasketProductI, index: number ) => (
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
                                                onRemoveProductHandler={(): void => removeProductHandler( product.productId )}/>
                                        ) )
                                }
                                {
                                    !!!total &&
                                    email !== '' &&
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
                        </>
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
