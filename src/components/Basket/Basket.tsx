import React, { useContext, useState } from 'react';
import './Basket.scss';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import useFirestore from '../../firebase/useFirestore';
import { GlobalContext } from '../../providers/Global/Global.provider';
import Dialog from '@material-ui/core/Dialog';
import { Button, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductDetail from '../ProductDetail/ProductDetail';
import i18n from '../../i18n';

const Basket: React.FC = () => {
    const globalContext = useContext( GlobalContext );
    const basketProducts = useFirestore( 'basket' );
    const [ removeId, setRemoveId ] = useState( '' );

    const productsToBuy = basketProducts.docs.filter( item => item.id === globalContext.data.currentUser.uid );

    let total = 0;
    !!productsToBuy[0] && productsToBuy[0].products.forEach( ( prod: any ) => {
        const price = !!globalContext.data.products.find( data => data.id === prod.productId )?.price ?
            Number( globalContext.data.products.find( data => data.id === prod.productId )?.price ) :
            0;
        const totalPrice = price * Number( prod.quantity );
        total += totalPrice;
    });

    const removeProductHandler = ( id: string ): void => {
        setRemoveId( id );
    };

    const onConfirmRemoveHandler = (): void => {
        try {
            const prods = basketProducts.docs
                .filter( item => item.id === globalContext.data.currentUser.uid )[0].products
                .filter( ( prod: any ) => prod.id.toString() !== removeId.toString() );

            basketProducts.updateCollection( globalContext.data.currentUser.uid, prods );
            setRemoveId( '' );
        } catch {}
    };

    return (
        <div className='basket'>
            <ShrHeader />
            {
                ( basketProducts.docs.length > 0 &&
                globalContext.data.currentUser.uid !== undefined ) ?
                    <div className='basket__products'>
                        {!!productsToBuy[0] &&
                        productsToBuy[0].products.map( ( product: any, index: number ) => (
                            <ProductDetail
                                key={index}
                                imgUrl={globalContext.data.products.find( data => data.id === product.productId )?.imgUrl || ''}
                                imgAlt={globalContext.data.products.find( data => data.id === product.productId )?.title || ''}
                                productDescription={globalContext.data.products.find( data => data.id === product.productId )?.title || ''}
                                productSize={'Tamaño: ' + product.size}
                                productQty={'Cantidad: ' + product.quantity}
                                productUnitPrice={'Precio Unitario: $' +
                                    globalContext.data.products.find( data => data.id === product.productId )?.price.toFixed( 2 ).toString() || '0'
                                }
                                productPrice={'$' + !!globalContext.data.products.find( data => data.id === product.productId )?.price ?
                                    ( Number( globalContext.data.products.find( data => data.id === product.productId )?.price ) *
                                    Number( product.quantity ) ).toFixed( 2 ).toString() : '0'
                                }
                                onRemoveProductHandler={(): void => removeProductHandler( product.id )}/>
                        ) )}
                        {!!!total &&
                        basketProducts.docs.length > 0 &&
                        globalContext.data.currentUser.uid !== undefined &&
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
                    <div className='basket__spinner'>
                        <CircularProgress />
                    </div>
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
