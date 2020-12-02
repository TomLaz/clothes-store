import React, { useContext, useEffect, useRef, useState } from 'react';
import './UserProfile.scss';
import { useHistory } from 'react-router-dom';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { Button, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import i18n from '../../i18n';
import GlobalService from '../../services/Global/Global.service';

const UserProfile: React.FC = () => {
    const passwordRef = useRef<any>();
    const passwordConfirmRef = useRef<any>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ email, setEmail ] = useState( '' );
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
                email,
                passwordRef.current.value );
            history.push( GlobalService.states.signIn );
        } catch {
            setError( i18n.t( 'sign-up.error' ) );
        } finally {
            setLoading( false );
        }
    };

    useEffect( () => {
        if ( globalContext.data.currentUser ) {
            setEmail( globalContext.data.currentUser.email );
        }
    }, [ globalContext.data.currentUser ] );

    return (
        <div className='user-profile'>
            <ShrHeader showSignUp={false} />
            <div className='user-profile__body'>
                <Button
                    onClick={(): void => {history.push( GlobalService.states.uploadProduct );}}
                    type='submit'
                    fullWidth={true}
                    variant='contained'
                    disabled={loading}>
                    {'Subir Producto'}
                </Button>
            </div>
            <div className='user-profile__body'>
                <div className='user-profile__top'>
                    <h2 className='user-profile__title'>
                        {i18n.t( 'user-profile.update' )}
                    </h2>
                </div>
                <div className='user-profile__bottom'>
                    <form
                        onSubmit={handleSubmit}
                        className='user-profile__form'>
                        <div className='user-profile__option'>
                            <TextField
                                fullWidth={true}
                                id='email'
                                value={email}
                                onChange={( item ): void => setEmail( item.target.value )}
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
                        <div className='user-profile__option'>
                            <TextField
                                helperText={i18n.t( 'user-profile.password-blank' )}
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
                        <div className='user-profile__option'>
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
                        {error && <div className='user-profile__option user-profile__error'>{error}</div>}
                        <div className='user-profile__option'>
                            <Button
                                type='submit'
                                fullWidth={true}
                                variant='contained'
                                disabled={loading}>
                                {i18n.t( 'user-profile.update' )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
