import React, { useContext, useEffect, useState } from 'react';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrSelect from '../shared/ShrSelect/ShrSelect';
import ShrCircularOption from '../shared/ShrCircularOption/ShrCircularOption';
import ModalImage from '../ModalImage/ModalImage';
import './AddProduct.scss';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { Button } from '@material-ui/core';
import GlobalService from '../../services/Global/Global.service';
import useFirestore from '../../firebase/useFirestore';
import i18n from '../../i18n';
import { Category, SubCategory } from '../../providers/Global/Global.model';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';

const AddProduct: React.FC = () => {
    const { id } = useParams();
    const { data: { products, categories, subCategories, currentUser, loading }} = useContext( GlobalContext );
    const history = useHistory();
    const basketProducts = useFirestore( 'basket' );

    const product = ( !!products.length && !!id ) ?
        products.find( ( prod ) => prod.id.toString() === id.toString() ) : '';
    const category = !!product ? categories.find( ( cat: Category ) => cat.id.toString() === product?.categoryId.toString() ) : '';
    const subcategory = !!product ?
        subCategories.find( ( subcat: SubCategory ) => subcat.id.toString() === product?.subcategoryId.toString() ) : '';

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

    const onOptionChange = ( event: React.ChangeEvent<HTMLSelectElement> ): void => {
        setQtySelected( event.target.value );
    };

    const imageSelectedHandler = ( imgSelected: string ): void => {
        setSelectedImg( imgSelected );
    };

    const addProductHandler = (): void => {
        try {
            const prods = !!basketProducts.docs
                .filter( ( item: any ) => item.id === currentUser.uid ).length ?
                basketProducts.docs.filter( item => item.id === currentUser.uid )[0].products : [];

            prods.push({
                'id': new Date().getTime().toString(),
                'productId': id.toString(),
                'quantity': qtySelected,
                'size': sizeSelected
            });

            basketProducts.updateCollection( currentUser.uid, prods );

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
        <ShrLayout>
            <div className='add-product'>
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
                                        <ModalImage
                                            selectedImg={selectedImg}
                                            setSelectedImg={setSelectedImg}
                                            title={product.title} />
                                    }
                                </div>
                            </div>
                            <div className='add-product__wrapper'>
                                <div className='add-product__info'>
                                    <div className='add-product__info-description'>
                                        <span className='add-product__name'>{!!product && product.title}</span>
                                        <p className='add-product__price'>{!!product && `$${product.price.toFixed( 2 )}`}</p>
                                        <p className='add-product__code'>{!!product && i18n.t( 'add-product.code', { code: product.id })}</p>
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
                                            <p className='add-product__shr-circular-options-title'>{i18n.t( 'add-product.size.title' )}</p>
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
                                                {i18n.t( 'add-product.added' )}
                                            </div>
                                        </div> :
                                        <div className='add-product__btn add-product__add'>
                                            <Button
                                                onClick={addProductHandler}
                                                variant='outlined'
                                                color='primary'
                                                size='large'>
                                                {i18n.t( 'add-product.add' )}
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !!!product && !loading && products.length > 0 &&
                        <div className='add-product__not-found-box'>
                            <div className='add-product__not-found'>
                                <h2>
                                    {i18n.t( 'add-product.not-found' )}
                                </h2>
                                <Button
                                    onClick={(): void => {history.push( GlobalService.states.home );}}
                                    type='submit'
                                    fullWidth={true}
                                    variant='contained'>
                                    {i18n.t( 'add-product.home' )}
                                </Button>
                            </div>
                        </div>
                }
                {
                    !!!product && products.length === 0 &&
                    <ShrSpinner />
                }
            </div>
        </ShrLayout>
    );
};

export default AddProduct;
