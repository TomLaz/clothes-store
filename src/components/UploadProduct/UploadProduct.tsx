import React, { useContext, useEffect, useRef, useState } from 'react';
import './UploadProduct.scss';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { projectStorage, projectFirestore, timestamp } from '../../firebase/firebase';
import { motion } from 'framer-motion';
import useFirestore from '../../firebase/useFirestore';
import { GlobalContext } from '../../providers/Global/Global.provider';
import sizes from './ProductsSizes';
import i18n from '../../i18n';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../shared/ShrButton/ShrButton';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import ProductDetail from '../ProductDetail/ProductDetail';

const UploadProduct: React.FC = () => {
    const { data: { currentUser, products }} = useContext( GlobalContext );
    const titleRef = useRef<any>();
    const descriptionRef = useRef<any>();
    const colorRef = useRef<any>();
    const priceRef = useRef<any>();

    const [ error, setError ] = useState( '' );
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( true );
    const [ loading, setLoading ] = useState( false );
    const [ file, setFile ] = useState<any>( null );
    const [ progress, setProgress ] = useState( 0 );
    const [ url, setUrl ] = useState( null );
    const [ categorySelected, setCategorySelected ] = useState( '' );
    const [ subcategorySelected, setSubcategorySelected ] = useState( '' );
    const [ subcategoriesFiltered, setSubcategoriesFiltered ] = useState<any>();

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
        const filtered = subcategories.docs.filter( sub => sub.categoryId.toString() === categorySelected );
        setSubcategoriesFiltered( filtered );
    }, [ categorySelected, subcategories.docs ] );

    const onSubmitHandler = async ( e: any ): Promise<void> => {
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
                }).catch( () => {
                    setError( i18n.t( 'upload-product.create-failed' ) );
                });
            });
        } catch {
            setError( i18n.t( 'upload-product.create-failed' ) );
        } finally {
            setLoading( false );
        }
    };

    const onImageChange = ( e: any ): void => {
        const selected = e.target.files[0];

        if ( selected && types.includes( selected.type ) ) {
            setFile( selected );
            setError( '' );
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

    const onCategoryChange = ( e: any ): void => {
        setSubcategorySelected( '' );
        setCategorySelected( e.target.value );
    };

    const onSubcategoryChange = ( e: any ): void => {
        setSubcategorySelected( e.target.value );
    };

    return (
        <div className='upload-product'>
            <ShrHeader />
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
                                fullWidth={true}
                                variant={ButtonVariant.contained}
                                disabled={loading}
                                color={ButtonColor.default}
                                type={ButtonType.button}
                                title={i18n.t( 'upload-product.image-selection' )}
                                size={ButtonSize.large} />
                        </label>
                        {file && <p>{file.name}</p>}
                    </div>
                    <div className='upload-product__option'>
                        <TextField
                            fullWidth={true}
                            id='title'
                            inputRef={titleRef}
                            label={i18n.t( 'upload-product.field-title' )}
                            name='title'
                            placeholder={i18n.t( 'upload-product.field-title' )}
                            onChange={onChangeHandler}
                            required={true}
                            type='input'/>
                    </div>
                    <div className='upload-product__option'>
                        <TextField
                            fullWidth={true}
                            id='description'
                            inputRef={descriptionRef}
                            label={i18n.t( 'upload-product.field-description' )}
                            name='description'
                            placeholder={i18n.t( 'upload-product.field-description' )}
                            onChange={onChangeHandler}
                            required={true}
                            type='input'/>
                    </div>
                    <div className='upload-product__option'>
                        <TextField
                            fullWidth={true}
                            id='color'
                            inputRef={colorRef}
                            label={i18n.t( 'upload-product.field-color' )}
                            name='color'
                            placeholder={i18n.t( 'upload-product.field-color' )}
                            onChange={onChangeHandler}
                            required={true}
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
                                        subcategoriesFiltered.map( ( val: any ) => (
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
                            fullWidth={true}
                            id='price'
                            inputRef={priceRef}
                            label='Precio'
                            name='price'
                            placeholder='Price'
                            onChange={onChangeHandler}
                            required={true}
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
                        <ShrButton
                            fullWidth={true}
                            variant={ButtonVariant.contained}
                            color={ButtonColor.default}
                            disabled={ loading || isButtonDisabled}
                            type={ButtonType.submit}
                            title={i18n.t( 'upload-product.upload-title' )}
                            size={ButtonSize.large} />
                    </div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: progress + '%' }}
                        className='upload-product__progress-bar' />
                </form>
            </div>
            <div className='upload-product__products'>
                {
                    !!( products.length > 0 &&
                        products.filter( item => item.userId === currentUser.uid ).length ) &&
                    <>
                        <h2 className='upload-product__products-title'>
                            {i18n.t( 'upload-product.my-products' )}
                        </h2>
                        {
                            products.map( ( product, index ) => (
                                // <ProductItem product={product} key={product.id} />
                                <ProductDetail
                                    key={index}
                                    imgUrl={product.imgUrl}
                                    imgAlt={product.title}
                                    title={product.title}
                                    color={product.color}
                                    productDescription={product.description}
                                    productPrice={product.price.toString()} />
                            ) )
                        }
                    </>
                }
            </div>
            <ShrFooter />
        </div>
    );
};

export default UploadProduct;
