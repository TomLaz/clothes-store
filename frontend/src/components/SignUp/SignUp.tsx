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
import './SignUp.scss';

const SignUp: React.FC = () => {
    const { updateJwt, updateRole, updateEmail, updateFavourites, updateBasket } = useContext( GlobalContext );
    const [ emailInput, setEmailInput ] = useState( '' );
    const [ passwordInput, setPaswordInput ] = useState( '' );
    const [ passwordConfirmInput, setPaswordConfirmInput ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const history = useHistory();

    const onSubmitHandler = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();

        if ( passwordInput !== passwordConfirmInput ) {
            return setError( i18n.t( 'sign-up.error-not-match' ) );
        }

        setError( '' );
        setLoading( true );

        GlobalService.register( emailInput, passwordInput )
            .then( async ( jwt ) => {
                /* Set token in localStorage */
                localStorage.setItem( 'token', jwt );

                /* Save jwt on context */
                updateJwt( jwt );

                /* Save role on context */
                updateRole( GlobalService.getRole( jwt ) );

                /* Save email on context */
                updateEmail( emailInput );

                /* Save favourites on context */
                updateFavourites({
                    id: GlobalService.getId( jwt ),
                    products: []
                });

                /* Save basket products on context */
                updateBasket({
                    id: GlobalService.getId( jwt ),
                    products: []
                });

                /* Redirect to home page */
                history.push( GlobalService.states.home );
            })
            .catch( ( err ) => {
                err.message ?
                    setError( err.message ) :
                    setError( i18n.t( 'sign-up.error' ) );
            })
            .finally( () => {
                setLoading( false );
            });
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
                                    value={emailInput}
                                    onChange={( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
                                        setEmailInput( e.target.value );
                                    }}
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
                                    value={passwordInput}
                                    onChange={( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
                                        setPaswordInput( e.target.value );
                                    }}
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
                                    value={passwordConfirmInput}
                                    onChange={( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
                                        setPaswordConfirmInput( e.target.value );
                                    }}
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
