import React, { useContext, useRef, useState } from 'react';
import { Button, TextField, TextFieldProps } from '@material-ui/core';
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
    const emailRef = useRef<TextFieldProps>();
    const passwordRef = useRef<TextFieldProps>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const history = useHistory();
    const { login } = useContext( GlobalContext );

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<any> => {
        e.preventDefault();

        try {
            setError( '' );
            setLoading( true );
            await login( emailRef.current?.value, passwordRef.current?.value );
            if ( shouldRedirect ) {
                history.push( GlobalService.states.home );
            }
        } catch {
            setError( i18n.t( 'sign-in.error' ) );
        } finally {
            setLoading( false );
        }
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
                                    fullWidth={true}
                                    id='email'
                                    inputRef={emailRef}
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
                                    type='input'/>
                            </div>
                            <div className='sign-in__option'>
                                <TextField
                                    fullWidth={true}
                                    id='password'
                                    inputRef={passwordRef}
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
                                    className='sign-in__option'
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    disabled={loading}>
                                    {i18n.t( 'sign-in.confirm' )}
                                </Button>
                            </div>
                        </form>
                        <Link
                            className='sign-in__forgot'
                            to={GlobalService.states.forgotPassword}>
                            <strong>
                                {i18n.t( 'sign-in.forgot-password' )}
                            </strong>
                        </Link>
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
