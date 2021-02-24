import React, { useContext, useEffect, useRef, useState } from 'react';
import './UploadProduct.scss';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { projectStorage, projectFirestore, timestamp } from '../../firebase/firebase';
import { motion } from 'framer-motion';
import useFirestore from '../../firebase/useFirestore';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ProductItem from '../ProductItem/ProductItem';

const UploadProduct: React.FC = () => {
    const globalContext = useContext( GlobalContext );
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
    const [ isOutlet, setIsOutlet ] = useState( false );
    const [ isSummer, setIsSummer ] = useState( false );

    const types = [ 'image/png', 'image/jpeg' ];
    const categories = useFirestore( 'categories' );
    const subcategories = useFirestore( 'subcategories' );
    const products = useFirestore( 'products' );

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
            setIsOutlet( false );
            setIsSummer( false );
        }
    }, [ url, setFile ] );

    useEffect( () => {
        const filtered = subcategories.docs.filter( sub => sub.categoryId.toString() === categorySelected );
        setSubcategoriesFiltered( filtered );
    }, [ categorySelected, subcategories.docs ] );

    const handleSubmit = async ( e: any ): Promise<void> => {
        e.preventDefault();

        if ( titleRef.current.value === '' ||
            descriptionRef.current.value === '' ||
            priceRef.current.value === '' ||
            colorRef.current.value === '' ||
            file === null ||
            categorySelected === '' ||
            subcategorySelected === '' ) {
            return setError( 'Complete all fields.' );
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

                const sizes = [
                    {
                        size: 'S',
                        stock: 10
                    },
                    {
                        size: 'M',
                        stock: 8
                    },
                    {
                        size: 'L',
                        stock: 5
                    },
                    {
                        size: 'XL',
                        stock: 7
                    },
                    {
                        size: 'XXL',
                        stock: 14
                    }
                ];

                collectionRef.add({
                    createdAt: createdAt,
                    description: descriptionRef.current.value,
                    color: colorRef.current.value,
                    imgUrl: imgUrl,
                    price: +priceRef.current.value,
                    title: titleRef.current.value,
                    categoryId: +categorySelected,
                    subcategoryId: +subcategorySelected,
                    userId: globalContext.data.currentUser.uid,
                    sizes: sizes
                }).then( productAdded => {
                    setUrl( imgUrl );

                    if ( isOutlet ) {
                        projectFirestore.collection( 'outlet' ).add({
                            createdAt: createdAt,
                            productId: productAdded.id
                        });
                    }

                    if ( isSummer ) {
                        projectFirestore.collection( 'summer' ).add({
                            createdAt: createdAt,
                            productId: productAdded.id
                        });
                    }
                }).catch( () => {
                    setError( 'Failed to create product' );
                });
            });
        } catch {
            setError( 'Failed to create product' );
        } finally {
            setLoading( false );
        }
    };

    const imageHandler = ( e: any ): void => {
        const selected = e.target.files[0];

        if ( selected && types.includes( selected.type ) ) {
            setFile( selected );
            setError( '' );
        } else {
            setFile( null );
            setError( 'Please select an image file (png or jpeg)' );
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

    const handleCategoryChange = ( e: any ): void => {
        setSubcategorySelected( '' );
        setCategorySelected( e.target.value );
    };

    const handleSubcategoryChange = ( e: any ): void => {
        setSubcategorySelected( e.target.value );
    };

    const isOutletChange = (): void => {
        setIsOutlet( !isOutlet );
    };

    const isSummerChange = (): void => {
        setIsSummer( !isSummer );
    };

    return (
        <div className='upload-product'>
            <ShrHeader />
            <div className='upload-product__body'>
                <div className='upload-product__top'>
                    <h2 className='upload-product__title'>
                        Subir Producto
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className='upload-product__bottom'>
                    <div className='upload-product__option upload-product__image'>
                        <Button
                            fullWidth
                            variant='contained'
                            component='label'
                            disabled={loading}>
                            Seleccionar Imagen
                            <input type='file' onChange={imageHandler} hidden />
                        </Button>
                        {file && <p>{file.name}</p>}
                    </div>
                    <div className='upload-product__option'>
                        <TextField
                            fullWidth={true}
                            id='title'
                            inputRef={titleRef}
                            label='Título'
                            name='title'
                            placeholder='Title'
                            onChange={onChangeHandler}
                            required={true}
                            type='input'/>
                    </div>
                    <div className='upload-product__option'>
                        <TextField
                            fullWidth={true}
                            id='description'
                            inputRef={descriptionRef}
                            label='Descripción'
                            name='description'
                            placeholder='Description'
                            onChange={onChangeHandler}
                            required={true}
                            type='input'/>
                    </div>
                    <div className='upload-product__option'>
                        <TextField
                            fullWidth={true}
                            id='color'
                            inputRef={colorRef}
                            label='Color'
                            name='color'
                            placeholder='Color'
                            onChange={onChangeHandler}
                            required={true}
                            type='input'/>
                    </div>
                    {
                        !!categories.docs.length &&
                        <div className='upload-product__option'>
                            <FormControl className='upload-product__categories'>
                                <InputLabel className='sid-cla-dropdown-label'>Categoria</InputLabel>
                                <Select
                                    fullWidth
                                    displayEmpty
                                    className='sid-cla-dropdown-select cla-dropdown__select'
                                    value={categorySelected}
                                    onChange={handleCategoryChange} >
                                    {categories.docs.map( element => (
                                        <MenuItem
                                            className='sid-cla-dropdown-option'
                                            key={ element.id }
                                            value={element.id + ''}>
                                            { element.name }
                                        </MenuItem>
                                    ) )}
                                </Select>
                            </FormControl>
                        </div>
                    }
                    {
                        subcategoriesFiltered &&
                        <div className='upload-product__option'>
                            <FormControl className='upload-product__categories'>
                                <InputLabel className='sid-cla-dropdown-label'>Subcategoria</InputLabel>
                                <Select
                                    fullWidth
                                    displayEmpty
                                    className='sid-cla-dropdown-select cla-dropdown__select'
                                    value={subcategorySelected}
                                    onChange={handleSubcategoryChange} >
                                    {subcategoriesFiltered.map( ( val: any ) => (
                                        <MenuItem
                                            className='sid-cla-dropdown-option'
                                            key={ val.id }
                                            value={ val.id }>
                                            { val.name }
                                        </MenuItem>
                                    ) )}
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
                    <div className='upload-product__option upload-product__checkbox'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isOutlet}
                                    onChange={isOutletChange}
                                    name="outlet"
                                    color="default"/>
                            }
                            label='Outlet' />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isSummer}
                                    onChange={isSummerChange}
                                    name="outlet"
                                    color="default"/>
                            }
                            label='Verano' />
                    </div>
                    {error && <div className='upload-product__option upload-product__error'>{error}</div>}
                    <div className='upload-product__option upload-product__submit-btn'>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            disabled={ loading || isButtonDisabled}>
                            Subir Producto
                        </Button>
                    </div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: progress + '%' }}
                        className='upload-product__progress-bar' />
                </form>
            </div>
            <div className='upload-product__products'>
                {
                    !!( globalContext.data.products.length &&
                        globalContext.data.products
                            .filter( item => item.userId === globalContext.data.currentUser.uid ).length ) &&
                    <>
                        <h2 className='upload-product__products-title'>Mis Productos</h2>
                        {
                            globalContext.data.products.map( product => (
                                <ProductItem product={product} key={product.id} />
                            ) )
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default UploadProduct;
