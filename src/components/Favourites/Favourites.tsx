import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import i18n from '../../i18n';
import { Favourite } from '../../providers/Global/Global.model';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import './Favourites.scss';

const Favourites: React.FC = () => {
    const { data: { favourites, products, currentUser }, updateFavouritesCollection } = useContext( GlobalContext );
    const [ favouritesFiltered, setFavouritesFiltered ] = useState<string[] | undefined>( undefined );
    const [ removeId, setRemoveId ] = useState( '' );

    useEffect( (): void => {
        if ( favourites.length > 0 ) {
            const filtered: Favourite[] = favourites.filter( item => item.id === currentUser.uid ) || [];
            if ( !!filtered && filtered[0].products.length > 0 ) {
                setFavouritesFiltered( filtered[0].products );
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ favourites ] );

    const removeProductHandler = ( id: string ): void => {
        setRemoveId( id );
    };

    const onConfirmRemoveHandler = (): void => {
        const prods = favourites
            .filter( item => item.id === currentUser.uid )[0].products
            .filter( ( favId: string ) => favId !== removeId.toString() );

        updateFavouritesCollection( currentUser.uid, prods );
        setRemoveId( '' );
    };

    return (
        <ShrLayout>
            <div className='favourites'>
                {
                    products.length > 0 ?
                        <>
                            {
                                favouritesFiltered !== undefined &&
                                favouritesFiltered?.length > 0 ?
                                    <div className='favourites__items'>
                                        {
                                            favouritesFiltered.map( ( favId, index ) => (
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
                    open={!!removeId}
                    onClose={(): void => setRemoveId( '' )}
                    aria-labelledby={i18n.t( 'favourites.delete-title' )}
                    aria-describedby={i18n.t( 'favourites.delete-check' )}
                >
                    <DialogTitle>
                        {i18n.t( 'favourites.title' )}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.t( 'favourites.delete-check' )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={(): void => setRemoveId( '' )}
                            color='primary'>
                            {i18n.t( 'favourites.cancel' )}
                        </Button>
                        <Button
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