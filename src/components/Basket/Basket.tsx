import React, { useContext, useState } from 'react';
import './Basket.scss';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import useFirestore from '../../firebase/useFirestore';
import { GlobalContext } from '../../providers/Global/Global.provider';
import Dialog from '@material-ui/core/Dialog';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

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
            <div className='basket__products'>
                {!!productsToBuy[0] &&
                productsToBuy[0].products.map( ( product: any, index: number ) => (
                    <div
                        className='basket__product'
                        key={index}>
                        <img
                            className='basket__product-img'
                            src={globalContext.data.products.find( data => data.id === product.productId )?.imgUrl}
                            alt={globalContext.data.products.find( data => data.id === product.productId )?.title || ''} />
                        <div className='basket__product-detail'>
                            <div className='basket__product-description'>
                                {!!globalContext.data.products.find( data => data.id === product.productId )?.title ?
                                    globalContext.data.products.find( data => data.id === product.productId )?.title : ''
                                }
                            </div>
                            <div className='basket__product-size'>Tamaño: {product.size}</div>
                            <div className='basket__product-qty'>Cantidad: {product.quantity}</div>
                            <div className='basket__product-unit-price'>Precio Unitario: ${
                                globalContext.data.products.find( data => data.id === product.productId )?.price || 0
                            }</div>
                            <div onClick={(): void => removeProductHandler( product.id )}>
                                <DeleteForeverIcon />
                            </div>
                        </div>
                        <div className='basket__product-price'>
                            ${!!globalContext.data.products.find( data => data.id === product.productId )?.price ?
                                ( Number( globalContext.data.products.find( data => data.id === product.productId )?.price ) *
                                Number( product.quantity ) ) : 0
                            }
                        </div>
                    </div>
                ) )}
                {!!!total &&
                    <div className='basket__empty'>
                        <div className='basket__empty-title'>
                            No hay productos en tu canasta
                        </div>
                    </div>
                }
                <div className='basket__total'>
                    <div className='basket__total-title'>TOTAL</div>
                    <div className='basket__total-price'>
                        ${total.toFixed( 2 )}
                    </div>
                </div>
            </div>
            <Dialog
                open={!!removeId}
                onClose={(): void => setRemoveId( '' )}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Eliminar Producto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Desea eliminar el producto de la canasta?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(): void => setRemoveId( '' )}
                        color='primary'>
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmRemoveHandler}
                        color='primary'>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <ShrFooter />
        </div>
    );
};

export default Basket;
