import React, { useContext, useState } from 'react';
import './Basket.scss';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import useFirestore from '../../firebase/useFirestore';
import { GlobalContext } from '../../providers/Global/Global.provider';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductDetail from '../ProductDetail/ProductDetail';
import i18n from '../../i18n';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';

const Basket: React.FC = () => {
    const { data: { currentUser, products }} = useContext( GlobalContext );
    const basketProducts = useFirestore( 'basket' );
    const [ removeId, setRemoveId ] = useState( '' );

    const productsToBuy = basketProducts.docs.filter( item => item.id === currentUser.uid );

    let total = 0;
    !!productsToBuy[0] && productsToBuy[0].products.forEach( ( prod: any ) => {
        const price = !!products.find( data => data.id === prod.productId )?.price ?
            Number( products.find( data => data.id === prod.productId )?.price ) :
            0;
        const totalPrice = price * Number( prod.quantity );
        total += totalPrice;
    });

    const removeProductHandler = ( id: string ): void => {
        setRemoveId( id );
    };

    const onConfirmRemoveHandler = (): void => {
        const prods = basketProducts.docs
            .filter( item => item.id === currentUser.uid )[0].products
            .filter( ( prod: any ) => prod.id.toString() !== removeId.toString() );

        basketProducts.updateCollection( currentUser.uid, prods );
        setRemoveId( '' );
    };

    return (
        <div className='basket'>
            <ShrHeader />
            {
                ( basketProducts.docs.length > 0 &&
                currentUser.uid !== undefined ) ?
                    <div className='basket__products'>
                        {!!productsToBuy[0] &&
                        productsToBuy[0].products.map( ( product: any, index: number ) => (
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
                        ) )}
                        {!!!total &&
                        basketProducts.docs.length > 0 &&
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
                                ${total.toFixed( 2 )}
                            </div>
                        </div>
                    </div> :
                    <ShrSpinner />
            }
            <Dialog
                open={!!removeId}
                onClose={(): void => setRemoveId( '' )}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{i18n.t( 'basket.delete-product' )}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {i18n.t( 'basket.delete-check' )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(): void => setRemoveId( '' )}
                        color='primary'>
                        {i18n.t( 'basket.cancel' )}
                    </Button>
                    <Button
                        onClick={onConfirmRemoveHandler}
                        color='primary'>
                        {i18n.t( 'basket.agree' )}
                    </Button>
                </DialogActions>
            </Dialog>
            <ShrFooter />
        </div>
    );
};

export default Basket;