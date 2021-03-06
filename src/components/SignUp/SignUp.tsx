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
import './SignUp.scss';

const SignUp: React.FC = () => {
    const emailRef = useRef<TextFieldProps>();
    const passwordRef = useRef<TextFieldProps>();
    const passwordConfirmRef = useRef<TextFieldProps>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const history = useHistory();
    const { signup } = useContext( GlobalContext );

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();

        if ( passwordRef.current?.value !== passwordConfirmRef.current?.value ) {
            return setError( i18n.t( 'sign-up.error-not-match' ) );
        }

        try {
            setError( '' );
            setLoading( true );

            await signup(
                emailRef.current?.value,
                passwordRef.current?.value );

            history.push( GlobalService.states.signIn );
        } catch {
            setError( i18n.t( 'sign-up.error' ) );
        } finally {
            setLoading( false );
        }
    };

    return (
        <ShrLayout showSignUp={false}>
            <div className='sign-up'>
                <div className='sign-up__body'>
                    <div className='sign-up__top'>
                        <h2 className='sign-up__title'>
                            {i18n.t( 'sign-up.title' )}
                        </h2>
                    </div>
                    <div className='sign-up__bottom'>
                        <form
                            onSubmit={onSubmitHandler}
                            className='sign-up__form'>
                            <div className='sign-up__option'>
                                <TextField
                                    className='sign-up__form-email'
                                    fullWidth
                                    id='email'
                                    inputRef={emailRef}
                                    label={i18n.t( 'global.email' )}
                                    name='email'
                                    placeholder='email'
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
                            <div className='sign-up__option'>
                                <TextField
                                    className='sign-up__form-password'
                                    fullWidth
                                    id='password'
                                    inputRef={passwordRef}
                                    label={i18n.t( 'global.password' )}
                                    name='password'
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
                            <div className='sign-up__option'>
                                <TextField
                                    className='sign-up__form-password-confirm'
                                    fullWidth
                                    id='password-confirm'
                                    inputRef={passwordConfirmRef}
                                    label={i18n.t( 'global.password-confirm' )}
                                    name='password-confirm'
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
                                <div className='sign-up__option sign-up__error'>
                                    {error}
                                </div>
                            }
                            <div className='sign-up__option'>
                                <Button
                                    className='sign-up__submit-button'
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    disabled={loading}>
                                    {i18n.t( 'sign-up' )}
                                </Button>
                            </div>
                        </form>
                        <div className='sign-up__actions'>
                            {i18n.t( 'sign-up.already-account' )}
                            <Link
                                className='sign-up__sign-in'
                                to={GlobalService.states.signIn}>
                                <strong>
                                    {i18n.t( 'sign-in' )}
                                </strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ShrLayout>
    );
};

export default SignUp;
