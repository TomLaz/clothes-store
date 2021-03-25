import React, { useContext, useEffect, useState } from 'react';
import './UserProfile.scss';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import i18n from '../../i18n';
import ShrButton, { ButtonSize, ButtonVariant, ButtonType, ButtonColor } from '../shared/ShrButton/ShrButton';

const UserProfile: React.FC = () => {
    const [ password, setPassword ] = useState( '' );
    const [ passwordConfirm, setPasswordConfirm ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ email, setEmail ] = useState( '' );
    const [ passwordUpdated, setPasswordUpdated ] = useState( false );
    const { data: { currentUser }, updatePassword } = useContext( GlobalContext );

    const onFormSubmit = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();

        if ( password !== passwordConfirm ) {
            return setError( i18n.t( 'update-profile.password-not-match' ) );
        }

        try {
            setError( '' );
            setLoading( true );

            if ( password !== '' ) {
                await updatePassword( email, password )
                    .then( () => {
                        setPassword( '' );
                        setPasswordConfirm( '' );
                        setPasswordUpdated( true );
                        setTimeout( () => {
                            setPasswordUpdated( false );
                        }, 3000 );
                    })
                    .catch( () => {
                        setError( i18n.t( 'update-profile.password-error' ) );
                    }).finally( () => {
                        setLoading( false );
                    });
            }
        } catch {
            setError( i18n.t( 'sign-up.error' ) );
        } finally {
            setLoading( false );
        }
    };

    useEffect( () => {
        let isUnmounted = false;

        if ( currentUser ) {
            if ( !isUnmounted ) {
                setEmail( currentUser.email );
            }
        }

        return () => {
            isUnmounted = true;
        };
    }, [ currentUser ] );

    return (
        <ShrLayout showSignUp={false}>
            <div className='user-profile'>
                <h1 className='user-profile__primary-title'>
                    {i18n.t( 'user-profile.title' )}
                </h1>
                <div className="container">
                    <div className='user-profile__wrapper'>
                        <div className='user-profile__top'>
                            <h2 className='user-profile__title'>
                                {i18n.t( 'user-profile.update' )}
                            </h2>
                        </div>
                        <div className='user-profile__bottom'>
                            <form
                                onSubmit={onFormSubmit}
                                className='user-profile__form'>
                                <div className='user-profile__option'>
                                    <TextField
                                        fullWidth={true}
                                        id='email'
                                        value={email || ''}
                                        label={i18n.t( 'global.email' )}
                                        name='email'
                                        placeholder='email'
                                        required={true}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <AccountCircle />
                                                </InputAdornment>
                                            )
                                        }}
                                        type='input'/>
                                </div>
                                <div className='user-profile__option'>
                                    <TextField
                                        className='user-profile__form-password'
                                        fullWidth={true}
                                        id='password'
                                        value={password || ''}
                                        onChange={( e ): void => setPassword( e.target.value ) }
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
                                <div className='user-profile__option'>
                                    <TextField
                                        className='user-profile__form-password-confirm'
                                        fullWidth={true}
                                        id='password-confirm'
                                        value={passwordConfirm || ''}
                                        onChange={( e ): void => setPasswordConfirm( e.target.value ) }
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
                                {
                                    error &&
                                    <div className='user-profile__option user-profile__error'>
                                        {error}
                                    </div>
                                }
                                <div className='user-profile__option'>
                                    {
                                        passwordUpdated ?
                                            <div className='user-profile__added'>
                                                <div className='user-profile__added-box'>
                                                    {i18n.t( 'update-profile.password-updated' )}
                                                </div>
                                            </div> :
                                            <ShrButton
                                                fullWidth
                                                disabled={loading}
                                                variant={ButtonVariant.contained}
                                                color={ButtonColor.default}
                                                type={ButtonType.submit}
                                                title={i18n.t( 'user-profile.update' )}
                                                size={ButtonSize.large} />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ShrLayout>
    );
};

export default UserProfile;
