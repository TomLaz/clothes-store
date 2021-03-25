import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import i18n from '../../i18n';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import './Favourites.scss';

const Favourites: React.FC = () => {
    const { data: { favourites, products }, updateFavouritesCollection, updateActiveMenuItem } = useContext( GlobalContext );
    const [ removeId, setRemoveId ] = useState( '' );

    useEffect( () => {
        let isUnmounted = false;

        if ( !isUnmounted ) {
            updateActiveMenuItem( 'favourites' );
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    const removeProductHandler = ( id: string ): void => {
        setRemoveId( id );
    };

    const onConfirmRemoveHandler = (): void => {
        const prods = favourites?.filter( ( favId: string ) => favId !== removeId.toString() );

        updateFavouritesCollection( prods );
        setRemoveId( '' );
    };

    return (
        <ShrLayout>
            <div className='favourites'>
                {
                    ( products.length > 0 &&
                        favourites !== undefined ) ?
                        <>
                            <h1 className='favourites__title'>
                                {i18n.t( 'global.favourites' )}
                            </h1>
                            {
                                favourites.length > 0 ?
                                    <div className='favourites__items'>
                                        {
                                            favourites.map( ( favId, index ) => (
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
                        </> :
                        <ShrSpinner />

                }
                <Dialog
                    className='favourites__dialog'
                    open={!!removeId}
                    onClose={(): void => setRemoveId( '' )}
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
