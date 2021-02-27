import React, { useContext, useRef, useState } from 'react';
import './SignIn.scss';
import { Link, useHistory } from 'react-router-dom';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { Button, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import i18n from '../../i18n';
import GlobalService from '../../services/Global/Global.service';
import ShrFooter from '../shared/ShrFooter/ShrFooter';

type SignInType = {
    shouldRedirect?: boolean;
}

const SignIn: React.FC<SignInType> = ({ shouldRedirect }) => {
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const history = useHistory();
    const { login } = useContext( GlobalContext );

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<any> => {
        e.preventDefault();

        try {
            setError( '' );
            setLoading( true );
            await login( emailRef.current.value, passwordRef.current.value );
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
        <div className='sign-in'>
            <ShrHeader showSignIn={false} />
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
                                placeholder='email'
                                required={true}
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
                                required={true}
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
                                fullWidth={true}
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
                        {i18n.t( 'sign-in.forgot-password' )}
                    </Link>
                    <div className='sign-in__signup'>
                        {i18n.t( 'sign-in.need-account' )}
                        <Link
                            className='sign-in__register'
                            to={GlobalService.states.signUp}>
                            {i18n.t( 'sign-up' )}
                        </Link>
                    </div>
                </div>
            </div>
            <ShrFooter />
        </div>
    );
};

SignIn.defaultProps = {
    shouldRedirect: false
};

export default SignIn;
