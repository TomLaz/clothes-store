import React, { useContext, useEffect, useState } from 'react';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrSelect from '../shared/ShrSelect/ShrSelect';
import ShrCircularOption from '../shared/ShrCircularOption/ShrCircularOption';
import ModalImage from '../ModalImage/ModalImage';
import './AddProduct.scss';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { Button, CircularProgress } from '@material-ui/core';
import GlobalService from '../../services/Global/Global.service';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import useFirestore from '../../firebase/useFirestore';

const AddProduct: React.FC = () => {
    const { id } = useParams();
    const globalContext = useContext( GlobalContext );
    const history = useHistory();
    const basketProducts = useFirestore( 'basket' );

    const product = ( !!globalContext.data.products.length && !!id ) ?
        globalContext.data.products.find( ( prod ) => prod.id.toString() === id.toString() ) : '';
    const category = !!product ? globalContext.data.categories.find( ( cat: any ) => cat.id.toString() === product?.categoryId.toString() ) : '';
    const subcategory = !!product ?
        globalContext.data.subCategories.find( ( subcat: any ) => subcat.id.toString() === product?.subcategoryId.toString() ) : '';

    const [ sizeSelected, setSizeSelected ] = useState<string>( '' );
    const [ qtyOptions, setQtyOptions ] = useState<string[]>( [] );
    const [ qtySelected, setQtySelected ] = useState( '0' );
    const [ selectedImg, setSelectedImg ] = useState( '' );
    const [ productAdded, setProductAdded ] = useState( false );

    useEffect( (): void => {
        if ( !!product && sizeSelected === '' ) {
            onOptionSelected( product.sizes[0].size, product.sizes[0].stock );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ product ] );

    const onOptionSelected = ( size: string, stock: number ): void => {
        setSizeSelected( size );

        const options = [];
        for ( let i=0; i< stock; i++ ) {
            options.push( ( i+1 ).toString() );
        }
        setQtyOptions( [ ...options ] );
        setQtySelected( '1' );
    };

    const onOptionChange = ( event: any ): void => {
        setQtySelected( event.target.value );
    };

    const imageSelectedHandler = ( imgSelected: string ): void => {
        setSelectedImg( imgSelected );
    };

    const addProductHandler = (): void => {
        try {
            const prods = !!basketProducts.docs
                .filter( ( item: any ) => item.id === globalContext.data.currentUser.uid ).length ?
                basketProducts.docs.filter( item => item.id === globalContext.data.currentUser.uid )[0].products : [];

            prods.push({
                'id': new Date().getTime().toString(),
                'productId': id.toString(),
                'quantity': qtySelected,
                'size': sizeSelected
            });

            basketProducts.updateCollection( globalContext.data.currentUser.uid, prods );

            setProductAdded( true );
            if ( !!product && !!product.sizes ) {
                onOptionSelected( product.sizes[0].size, product.sizes[0].stock );
            }

            setTimeout( () => {
                setProductAdded( false );
            }, 3000 );
        } catch {}
    };

    return (
        <div className='add-product'>
            <ShrHeader />
            {
                !!product &&
                <div className='add-product__category-bar'>
                    <div className='add-product__category-box'>
                        <span>{!!category && category.name}</span>
                        <span>{!!subcategory && '/'}</span>
                        <span>{!!subcategory && subcategory.name}</span>
                        <span>{!!product && '/'}</span>
                        <span>{!!product && product.title}</span>
                    </div>
                </div>
            }

            {
                !!product &&
                <div className='add-product__main'>
                    <div className='add-product__detail'>
                        <div className='add-product__main-left'>
                            <div className='add-product__main-left-container'>
                                <img
                                    src={product.imgUrl}
                                    alt='title'
                                    className='add-product__image'
                                    onClick={(): void => imageSelectedHandler( product?.imgUrl || '' )} />
                                {!!selectedImg &&
                                    <ModalImage selectedImg={selectedImg} setSelectedImg={setSelectedImg} title='titulo' />
                                }
                            </div>
                        </div>
                        <div className='add-product_wrapper'>
                            <div className='add-product__info'>
                                <div className='add-product__info-description'>
                                    <span className='add-product__name'>{!!product && product.title}</span>
                                    <p className='add-product__price'>{!!product && `$${product.price.toFixed( 2 )}`}</p>
                                    <p className='add-product__code'>{!!product && `COD: ${product.id}`}</p>
                                    <div className='add-product__color-box'>
                                        <p>
                                            <span className='add-product__color-title'>
                                                {!!product && 'Color:'}
                                            </span> {!!product && product.color}
                                        </p>
                                    </div>
                                </div>
                                <div className='add-product__sizes-box'>
                                    <div className='add-product__shr-circular-options'>
                                        <p className='add-product__shr-circular-options-title'>Seleccione Talle</p>
                                        <div className='add-product__shr-circular-options-box'>
                                            {
                                                product.sizes.map( item => (
                                                    <ShrCircularOption
                                                        key={item.size}
                                                        size={item.size}
                                                        sizeSelected={sizeSelected}
                                                        onOptionSelected={(): any =>
                                                            onOptionSelected( item.size, item.stock )}/>
                                                ) )
                                            }
                                        </div>
                                    </div>
                                    <div className='add-product__quantity'>
                                        <ShrSelect
                                            options={qtyOptions}
                                            title='Cantidad en stock:'
                                            onOptionChange={onOptionChange}
                                            selected={qtySelected ?? qtySelected}/>
                                    </div>
                                </div>
                            </div>
                            <div className='add-product__actions'>
                                {productAdded ?
                                    <div className='add-product__btn add-product__added'>
                                        <div className='add-product__btn add-product__added-box'>
                                            Producto Agregado
                                        </div>
                                    </div> :
                                    <div className='add-product__btn add-product__add'>
                                        <Button
                                            onClick={addProductHandler}
                                            variant='outlined'
                                            color='primary'
                                            size='large'>
                                            Agregar al canasto
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !!!product && !globalContext.data.loading && globalContext.data.products.length > 0 &&
                    <div className='add-product__not-found-box'>
                        <div className='add-product__not-found'>
                            <h2>
                                Producto No Encontrado
                            </h2>
                            <Button
                                onClick={(): void => {history.push( GlobalService.states.home );}}
                                type='submit'
                                fullWidth={true}
                                variant='contained'>
                                Ir al Inicio
                            </Button>
                        </div>
                    </div>
            }
            {
                !!!product && globalContext.data.products.length === 0 &&
                <div className='add-product__spinner'>
                    <CircularProgress />
                </div>
            }
            <ShrFooter />
        </div>
    );
};

export default AddProduct;
