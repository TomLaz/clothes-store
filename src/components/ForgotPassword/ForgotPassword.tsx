import React, { useContext, useRef, useState } from 'react';
import { Button, TextField, TextFieldProps } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import './ForgotPassword.scss';

const ForgotPassword: React.FC = () => {
    const emailRef = useRef<TextFieldProps>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ message, setMessage ] = useState( '' );
    const { resetPassword } = useContext( GlobalContext );

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();

        try {
            setError( '' );
            setLoading( true );
            await resetPassword( emailRef.current?.value );
            setMessage( i18n.t( 'forgot-password.success' ) );
        } catch {
            setError( i18n.t( 'forgot-password.error' ) );
        } finally {
            setLoading( false );
        }
    };

    return (
        <ShrLayout>
            <div className='forgot-password'>
                <div className='forgot-password__body'>
                    <div className='forgot-password__top'>
                        <h2 className='forgot-password__title'>
                            {i18n.t( 'forgot-password.title' )}
                        </h2>
                    </div>
                    <div className='forgot-password__bottom'>
                        <form
                            onSubmit={onSubmitHandler}
                            className='forgot-password__form'>
                            <div className='forgot-password__option'>
                                <TextField
                                    className='forgot-password__input-email'
                                    fullWidth={true}
                                    id='email'
                                    inputRef={emailRef}
                                    label={i18n.t( 'global.email' )}
                                    name='email'
                                    placeholder={i18n.t( 'global.email' )}
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
                            {
                                error &&
                                <div className='forgot-password__option forgot-password__error'>
                                    {error}
                                </div>
                            }
                            {
                                message &&
                                <div className='forgot-password__option forgot-password__success'>
                                    {message}
                                </div>
                            }
                            <div className='forgot-password__option forgot-password__button'>
                                <Button
                                    fullWidth={true}
                                    type='submit'
                                    variant='contained'
                                    disabled={loading}>
                                    {i18n.t( 'forgot-password.recover' )}
                                </Button>
                            </div>
                        </form>
                        <Link
                            className='forgot-password__forgot'
                            to={GlobalService.states.signIn}>
                            <strong>
                                {i18n.t( 'sign-in.title' )}
                            </strong>
                        </Link>
                        <div className='forgot-password__signup'>
                            {i18n.t( 'sign-in.need-account' )}
                            <Link
                                className='forgot-password__register'
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

export default ForgotPassword;
