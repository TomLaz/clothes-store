import React, { useContext, useRef, useState } from 'react';
import './SignUp.scss';
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

const SignUp: React.FC = () => {
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    const passwordConfirmRef = useRef<any>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const history = useHistory();
    const globalContext = useContext( GlobalContext );

    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ): Promise<any> => {
        e.preventDefault();

        if ( passwordRef.current.value !== passwordConfirmRef.current.value ) {
            return setError( i18n.t( 'sign-up.error-not-match' ) );
        }

        try {
            setError( '' );
            setLoading( true );
            await globalContext.signup(
                emailRef.current.value,
                passwordRef.current.value );
            history.push( GlobalService.states.signIn );
        } catch {
            setError( i18n.t( 'sign-up.error' ) );
        } finally {
            setLoading( false );
        }
    };

    return (
        <div className='sign-up'>
            <ShrHeader showSignUp={false} />
            <div className='sign-up__body'>
                <div className='sign-up__top'>
                    <h2 className='sign-up__title'>
                        {i18n.t( 'sign-up.title' )}
                    </h2>
                </div>
                <div className='sign-up__bottom'>
                    <form
                        onSubmit={handleSubmit}
                        className='sign-up__form'>
                        <div className='sign-up__option'>
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
                        <div className='sign-up__option'>
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
                        <div className='sign-up__option'>
                            <TextField
                                fullWidth={true}
                                id='password-confirm'
                                inputRef={passwordConfirmRef}
                                label={i18n.t( 'global.password-confirm' )}
                                name='password-confirm'
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
                        {error && <div className='sign-up__option sign-up__error'>{error}</div>}
                        <div className='sign-up__option'>
                            <Button
                                type='submit'
                                fullWidth={true}
                                variant='contained'
                                disabled={loading}>
                                {i18n.t( 'sign-up' )}
                            </Button>
                        </div>
                    </form>
                    <div className='sign-up__signup'>
                        {i18n.t( 'sign-up.already-account' )}
                        <Link
                            className='sign-up__register'
                            to={GlobalService.states.signIn}>
                            {i18n.t( 'sign-in.confirm' )}
                        </Link>
                    </div>
                </div>
            </div>
            <ShrFooter />
        </div>
    );
};

export default SignUp;
