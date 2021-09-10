import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import './SignIn.scss';

type SignInType = {
    shouldRedirect?: boolean;
}

const SignIn: React.FC<SignInType> = ({ shouldRedirect }) => {
    const { data: { loading }, updateJwt, updateRole, updateEmail, updateFavourites,
        updateBasket, noUserLogged, updateLoading } = useContext( GlobalContext );
    const [ emailInput, setEmailInput ] = useState( '' );
    const [ passwordInput, setPaswordInput ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const history = useHistory();

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();

        setError( '' );
        updateLoading( true );

        GlobalService.login( emailInput, passwordInput )
            .then( async ( jwt ) => {
                /* istanbul ignore else */
                if ( shouldRedirect ) {
                    try {
                        const [ favourites, basket ] = await Promise.all( [
                            GlobalService.getFavorites( jwt ),
                            GlobalService.getBasket( jwt )
                        ] );

                        /* Set token in localStorage */
                        localStorage.setItem( 'token', jwt );

                        /* Save jwt on context */
                        updateJwt( jwt );

                        /* Save role on context */
                        updateRole( GlobalService.getRole( jwt ) );

                        /* Save email on context */
                        updateEmail( emailInput );

                        /* Save favourites on context */
                        updateFavourites( favourites || {
                            id: GlobalService.getId( jwt ),
                            products: []
                        });

                        /* Save basket products on context */
                        updateBasket( basket || {
                            id: GlobalService.getId( jwt ),
                            products: []
                        });

                        /* Redirect to home page */
                        history.push( GlobalService.states.home );
                    } catch {
                        noUserLogged();
                    } finally {
                        updateLoading( false );
                    }
                }
            })
            .catch( () => {
                setError( i18n.t( 'sign-in.error' ) );
            })
            .finally( () => {
                updateLoading( false );
            });
    };

    return (
        <ShrLayout showSignIn={false}>
            <div className='sign-in'>
                <div className='sign-in__body'>
                    <div className='sign-in__top'>
                        <h2 className='sign-in__title'>
                            {i18n.t( 'sign-in.title' )}
                        </h2>
                    </div>
                    <div className='sign-in__bottom'>
                        <form
                            onSubmit={onSubmitHandler}
                            className='sign-in__form'>
                            <div className='sign-in__option'>
                                <TextField
                                    className='sign-in__form-email'
                                    fullWidth
                                    id='email'
                                    value={emailInput}
                                    onChange={( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
                                        setEmailInput( e.target.value );
                                    }}
                                    label={i18n.t( 'global.email' )}
                                    name='email'
                                    placeholder={i18n.t( 'global.email' )}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='email'/>
                            </div>
                            <div className='sign-in__option'>
                                <TextField
                                    className='sign-in__form-password'
                                    fullWidth
                                    id='password'
                                    value={passwordInput}
                                    onChange={( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
                                        setPaswordInput( e.target.value );
                                    }}
                                    label={i18n.t( 'global.password' )}
                                    name='password'
                                    placeholder={i18n.t( 'global.password' )}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <LockIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='password'/>
                            </div>
                            {
                                error &&
                                <div className='sign-in__option sign-in__error'>
                                    {error}
                                </div>
                            }
                            <div className='sign-in__option'>
                                <Button
                                    className='sign-in__option sign-in__submit-button'
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    disabled={loading}>
                                    {i18n.t( 'sign-in.confirm' )}
                                </Button>
                            </div>
                        </form>
                        <div className='sign-in__signup'>
                            {i18n.t( 'sign-in.need-account' )}
                            <Link
                                className='sign-in__register'
                                to={GlobalService.states.signUp}>
                                <strong>
                                    {i18n.t( 'sign-up' )}
                                </strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ShrLayout>
    );
};

SignIn.defaultProps = {
    shouldRedirect: false
};

export default SignIn;
