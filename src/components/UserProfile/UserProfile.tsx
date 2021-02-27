import React, { useContext, useEffect, useRef, useState } from 'react';
import './UserProfile.scss';
import { useHistory } from 'react-router-dom';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import { GlobalContext } from '../../providers/Global/Global.provider';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import i18n from '../../i18n';
import GlobalService from '../../services/Global/Global.service';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import ShrButton, { ButtonSize, ButtonVariant, ButtonType, ButtonColor } from '../shared/ShrButton/ShrButton';

const UserProfile: React.FC = () => {
    const passwordRef = useRef<any>();
    const passwordConfirmRef = useRef<any>();
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ email, setEmail ] = useState( '' );
    const history = useHistory();
    const { data: { currentUser }, signup } = useContext( GlobalContext );

    const onFormSubmit = async ( e: React.FormEvent<HTMLFormElement> ): Promise<any> => {
        e.preventDefault();

        if ( passwordRef.current.value !== passwordConfirmRef.current.value ) {
            return setError( i18n.t( 'sign-up.error-not-match' ) );
        }

        try {
            setError( '' );
            setLoading( true );

            await signup( email, passwordRef.current.value );

            history.push( GlobalService.states.signIn );
        } catch {
            setError( i18n.t( 'sign-up.error' ) );
        } finally {
            setLoading( false );
        }
    };

    useEffect( () => {
        if ( currentUser ) {
            setEmail( currentUser.email );
        }
    }, [ currentUser ] );

    return (
        <div className='user-profile'>
            <ShrHeader showSignUp={false} />
            <div className='user-profile__body'>
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
                        {
                            error &&
                            <div className='user-profile__option user-profile__error'>
                                {error}
                            </div>
                        }
                        <div className='user-profile__option'>
                            <ShrButton
                                fullWidth={true}
                                disabled={loading}
                                variant={ButtonVariant.contained}
                                color={ButtonColor.default}
                                type={ButtonType.submit}
                                title={i18n.t( 'user-profile.update' )}
                                size={ButtonSize.large} />
                        </div>
                    </form>
                </div>
            </div>
            <div className='user-profile__body'>
                <div className='user-profile__top'>
                    <h2 className='user-profile__title'>
                        {i18n.t( 'user-profile.upload-products' )}
                    </h2>
                </div>
                <div className='user-profile__bottom'>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, enim?</p>
                    <br />
                    <p>Tum minus aperiam laboriosam possimus quam ipsa esse?</p>
                    <br />
                    <p>Adipisicing elit. Laborum facilis architecto laudantium. Molestiae est impedit, laborum magnam.</p>
                    <br />
                    <p>Quaerat perspiciatis repudiandae quo pariatur doloribus, ad dolorum architecto.</p>
                    <br />
                    <ShrButton
                        fullWidth={true}
                        variant={ButtonVariant.contained}
                        color={ButtonColor.default}
                        type={ButtonType.button}
                        title={i18n.t( 'user-profile.upload-product' )}
                        size={ButtonSize.large}
                        action={(): void => {history.push( GlobalService.states.uploadProduct );}} />
                </div>
            </div>
            <ShrFooter />
        </div>
    );
};

export default UserProfile;
