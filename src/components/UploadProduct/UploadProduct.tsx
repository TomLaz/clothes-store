import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { motion } from 'framer-motion';
import { projectFirestore, projectStorage, timestamp } from '../../firebase/firebase';
import useFirestore from '../../firebase/useFirestore';
import i18n from '../../i18n';
import { Product, SubCategory } from '../../providers/Global/Global.model';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ProductDetail from '../ProductDetail/ProductDetail';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../shared/ShrButton/ShrButton';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import sizes from './ProductsSizes';
import './UploadProduct.scss';

const UploadProduct: React.FC = () => {
    const { data: { currentUser, products }} = useContext( GlobalContext );
    const titleRef = useRef<any>();
    const descriptionRef = useRef<any>();
    const colorRef = useRef<any>();
    const priceRef = useRef<any>();

    const [ error, setError ] = useState( '' );
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( true );
    const [ loading, setLoading ] = useState( false );
    const [ file, setFile ] = useState<File | null>( null );
    const [ progress, setProgress ] = useState( 0 );
    const [ url, setUrl ] = useState( null );
    const [ categorySelected, setCategorySelected ] = useState( '' );
    const [ subcategorySelected, setSubcategorySelected ] = useState( '' );
    const [ subcategoriesFiltered, setSubcategoriesFiltered ] = useState<SubCategory[]>();
    const [ productUploaded, setProductUploaded ] = useState( false );
    const [ productsFiltered, setProductsFiltered ] = useState<Product[]>( [] );

    const types = [ 'image/png', 'image/jpeg' ];
    const categories = useFirestore( 'categories' );
    const subcategories = useFirestore( 'subcategories' );

    useEffect( () => {
        if ( url ) {
            setFile( null );
            setUrl( null );
            setProgress( 0 );
            setLoading( false );
            descriptionRef.current.value = '';
            priceRef.current.value = '';
            titleRef.current.value = '';
            colorRef.current.value = '';
            setCategorySelected( '' );
            setSubcategorySelected( '' );
        }
    }, [ url, setFile ] );

    useEffect( () => {
        const prodFiltered = products.filter( item => item.userId === currentUser.uid ).length > 0 ?
            products.filter( item => item.userId === currentUser.uid ) : [];
        setProductsFiltered( prodFiltered );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ products ] );

    useEffect( () => {
        const filtered: SubCategory[] = subcategories.docs.filter( sub => sub.categoryId.toString() === categorySelected );
        setSubcategoriesFiltered( filtered );
    }, [ categorySelected, subcategories.docs ] );

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();

        if ( titleRef.current.value === '' ||
            descriptionRef.current.value === '' ||
            priceRef.current.value === '' ||
            colorRef.current.value === '' ||
            file === null ||
            categorySelected === '' ||
            subcategorySelected === '' ) {
            return setError( i18n.t( 'upload-product.complete-fields' ) );
        }

        setLoading( true );

        try {
            setError( '' );
            const storageRef = projectStorage.ref( file.name );
            const collectionRef = projectFirestore.collection( 'products' );

            storageRef.put( file ).on( 'state_changed', ( snap ) => {
                const percentage = ( snap.bytesTransferred / snap.totalBytes ) * 100;
                setProgress( percentage );
            }, () => {
                setError( 'error' );
            }, async () => {
                const imgUrl = await storageRef.getDownloadURL();
                const createdAt = timestamp();

                collectionRef.add({
                    createdAt: createdAt,
                    description: descriptionRef.current.value,
                    color: colorRef.current.value,
                    imgUrl: imgUrl,
                    price: +priceRef.current.value,
                    title: titleRef.current.value,
                    categoryId: +categorySelected,
                    subcategoryId: +subcategorySelected,
                    userId: currentUser.uid,
                    sizes: sizes
                }).then( () => {
                    setUrl( imgUrl );
                    setProductUploaded( true );

                    setTimeout( () => {
                        setProductUploaded( false );
                    }, 3000 );
                }).catch( () => {
                    setError( i18n.t( 'upload-product.create-failed' ) );
                }).finally( () => {
                    setLoading( false );
                });
            });
        } catch {
            setError( i18n.t( 'upload-product.create-failed' ) );
        }
    };

    const onImageChange = ( e: React.ChangeEvent<HTMLInputElement> ): void => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const selected = e.target.files![0];

        if ( selected && types.includes( selected.type ) ) {
            const img = new Image();
            img.onload = (): void => {
                if ( img.height !== 438 || img.width !== 350 ) {
                    setFile( null );
                    setError( i18n.t( 'upload-product.size-format' ) );
                } else {
                    setFile( selected );
                    setError( '' );
                }
            };
            img.src = URL.createObjectURL( selected );
        } else {
            setFile( null );
            setError( i18n.t( 'upload-product.image-format' ) );
        }

        onChangeHandler();
    };

    const onChangeHandler = (): void => {
        if (
            descriptionRef?.current?.value === '' ||
            colorRef?.current?.value === '' ||
            priceRef?.current?.value === '' ||
            titleRef?.current?.value === '' ||
            file === null ||
            categorySelected === '' ||
            subcategorySelected === ''
        ) {
            !isButtonDisabled && setIsButtonDisabled( true );
        } else {
            isButtonDisabled && setIsButtonDisabled( false );
        }
    };

    const onCategoryChange = ( e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }> ): void => {
        setSubcategorySelected( '' );
        setCategorySelected( typeof e.target.value === 'string' ? e.target.value : '' );
    };

    const onSubcategoryChange = ( e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }> ): void => {
        setSubcategorySelected( typeof e.target.value === 'string' ? e.target.value : '' );
    };

    return (
        <ShrLayout>
            <div className='upload-product'>
                <div className='upload-product__body'>
                    <div className='upload-product__top'>
                        <h2 className='upload-product__title'>
                            {i18n.t( 'upload-product.upload-title' )}
                        </h2>
                    </div>
                    <form
                        onSubmit={onSubmitHandler}
                        className='upload-product__bottom'>
                        <div className='upload-product__option upload-product__image'>
                            <input
                                accept='image/*'
                                onChange={onImageChange}
                                style={{ display: 'none' }}
                                id='file-upload'
                                multiple
                                type='file'
                            />
                            <label htmlFor='file-upload'>
                                <ShrButton
                                    fullWidth
                                    variant={ButtonVariant.contained}
                                    disabled={loading}
                                    color={ButtonColor.default}
                                    type={ButtonType.button}
                                    title={i18n.t( 'upload-product.image-selection' )}
                                    size={ButtonSize.large} />
                            </label>
                            {
                                file &&
                                <p>
                                    {file.name}
                                </p>
                            }
                        </div>
                        <div className='upload-product__option'>
                            <TextField
                                fullWidth
                                id='title'
                                inputRef={titleRef}
                                label={i18n.t( 'upload-product.field-title' )}
                                name='title'
                                placeholder={i18n.t( 'upload-product.field-title' )}
                                onChange={onChangeHandler}
                                required
                                type='input'/>
                        </div>
                        <div className='upload-product__option'>
                            <TextField
                                fullWidth
                                id='description'
                                inputRef={descriptionRef}
                                label={i18n.t( 'upload-product.field-description' )}
                                name='description'
                                placeholder={i18n.t( 'upload-product.field-description' )}
                                onChange={onChangeHandler}
                                required
                                type='input'/>
                        </div>
                        <div className='upload-product__option'>
                            <TextField
                                fullWidth
                                id='color'
                                inputRef={colorRef}
                                label={i18n.t( 'upload-product.field-color' )}
                                name='color'
                                placeholder={i18n.t( 'upload-product.field-color' )}
                                onChange={onChangeHandler}
                                required
                                type='input'/>
                        </div>
                        {
                            !!categories.docs.length &&
                            <div className='upload-product__option'>
                                <FormControl className='upload-product__categories'>
                                    <InputLabel className='sid-cla-dropdown-label'>
                                        {i18n.t( 'upload-product.category' )}
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        displayEmpty
                                        className='sid-cla-dropdown-select cla-dropdown__select'
                                        value={categorySelected}
                                        onChange={onCategoryChange} >
                                        {
                                            categories.docs.map( element => (
                                                <MenuItem
                                                    className='sid-cla-dropdown-option'
                                                    key={ element.id }
                                                    value={element.id.toString()}>
                                                    { element.name }
                                                </MenuItem>
                                            ) )
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        }
                        {
                            subcategoriesFiltered &&
                            <div className='upload-product__option'>
                                <FormControl className='upload-product__categories'>
                                    <InputLabel className='sid-cla-dropdown-label'>
                                        {i18n.t( 'upload-product.subcategory' )}
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        displayEmpty
                                        className='sid-cla-dropdown-select cla-dropdown__select'
                                        value={subcategorySelected}
                                        onChange={onSubcategoryChange} >
                                        {
                                            subcategoriesFiltered.map( ( val: SubCategory ) => (
                                                <MenuItem
                                                    className='sid-cla-dropdown-option'
                                                    key={ val.id }
                                                    value={ val.id }>
                                                    { val.name }
                                                </MenuItem>
                                            ) )
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        }
                        <div className='upload-product__option'>
                            <TextField
                                fullWidth
                                id='price'
                                inputRef={priceRef}
                                label='Precio'
                                name='price'
                                placeholder='Price'
                                onChange={onChangeHandler}
                                required
                                inputProps={{ step: 0.01 }}
                                type='number'/>
                        </div>
                        {
                            error &&
                            <div className='upload-product__option upload-product__error'>
                                {error}
                            </div>
                        }
                        <div className='upload-product__option upload-product__submit-btn'>
                            {
                                productUploaded ?
                                    <div className='upload-product__added'>
                                        <div className='upload-product__added-box'>
                                            {i18n.t( 'upload-product.uploaded' )}
                                        </div>
                                    </div> :
                                    <ShrButton
                                        fullWidth
                                        variant={ButtonVariant.contained}
                                        color={ButtonColor.default}
                                        disabled={ loading || isButtonDisabled}
                                        type={ButtonType.submit}
                                        title={i18n.t( 'upload-product.upload-title' )}
                                        size={ButtonSize.large} />
                            }
                        </div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: progress + '%' }}
                            className='upload-product__progress-bar' />
                    </form>
                </div>
                {
                    productsFiltered.length > 0 &&
                    <div className='upload-product__products'>
                        <h2 className='upload-product__products-title'>
                            {i18n.t( 'upload-product.my-products' )}
                        </h2>
                        {
                            productsFiltered.map( ( product: Product ) => (
                                <ProductDetail
                                    key={product.id}
                                    imgUrl={product.imgUrl}
                                    imgAlt={product.title}
                                    title={product.title}
                                    color={product.color}
                                    productDescription={product.description}
                                    productPrice={product.price.toString()} />
                            ) )
                        }
                    </div>
                }
            </div>
        </ShrLayout>
    );
};

export default UploadProduct;
