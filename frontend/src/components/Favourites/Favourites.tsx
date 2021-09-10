import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import i18n from '../../i18n';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import './Favourites.scss';

const Favourites: React.FC = () => {
    const { data: { email, jwt, favourites, products },
        updateActiveMenuItem, updateFavourites } = useContext( GlobalContext );
    const [ removeId, setRemoveId ] = useState( '' );

    useEffect( () => {
        let isUnmounted = false;

        !isUnmounted && updateActiveMenuItem( 'favourites' );

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    const removeProductHandler = ( id: string ): void => {
        setRemoveId( id );
    };

    const onConfirmRemoveHandler = (): void => {
        const favs = JSON.parse( JSON.stringify( favourites ) );
        const productsFiltered = favs.products.filter( ( prod: string ) => prod !== removeId.toString() );
        favs.products = productsFiltered;

        updateFavourites( favs );
        GlobalService.updateFavourites( jwt || '', favs );
        setRemoveId( '' );
    };

    const onDialogClickHandler = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ): void => {
        const element = e.target as Element;

        if ( element.classList.contains( 'MuiBackdrop-root' ) ||
        element.classList.contains( 'MuiDialog-container' ) ) {
            setRemoveId( '' );
        }
    };

    return (
        <ShrLayout>
            <div className='favourites'>
                {
                    ( email === null ||
                        products === null ) ?
                        <ShrSpinner /> :
                        <>
                            <h1 className='favourites__title'>
                                {i18n.t( 'global.favourites' )}
                            </h1>
                            {
                                products.length > 0 &&
                                favourites &&
                                favourites.products.length > 0 ?
                                    <div className='favourites__items'>
                                        {
                                            favourites.products.map( ( favId, index ) => (
                                                <ProductDetail
                                                    key={index}
                                                    imgUrl={products.find( data => data.id === favId )?.imgUrl || ''}
                                                    imgAlt={products.find( data => data.id === favId )?.title || ''}
                                                    title={products.find( data => data.id === favId )?.title || ''}
                                                    productDescription={products.find( data => data.id === favId )?.description || ''}
                                                    productPrice={products.find( data => data.id === favId )?.price.toString() || ''}
                                                    onRemoveProductHandler={(): void => removeProductHandler( favId )} />
                                            ) )
                                        }
                                    </div> :
                                    <div className='favourites__empty'>
                                        <div className='favourites__empty-title'>
                                            {i18n.t( 'favourites.empty' )}
                                        </div>
                                    </div>
                            }
                        </>
                }
                <Dialog
                    className='favourites__dialog'
                    open={!!removeId}
                    onClick={onDialogClickHandler}
                    aria-labelledby={i18n.t( 'favourites.delete-title' )}
                    aria-describedby={i18n.t( 'favourites.delete-check' )}
                >
                    <DialogTitle>
                        {i18n.t( 'global.favourites' )}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.t( 'favourites.delete-check' )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className='favourites__cancel-remove'
                            onClick={(): void => setRemoveId( '' )}
                            color='primary'>
                            {i18n.t( 'favourites.cancel' )}
                        </Button>
                        <Button
                            className='favourites__confirm-remove'
                            onClick={onConfirmRemoveHandler}
                            color='primary'>
                            {i18n.t( 'favourites.agree' )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ShrLayout>
    );
};

export default Favourites;
