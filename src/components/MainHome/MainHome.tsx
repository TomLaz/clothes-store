import { Button } from '@material-ui/core';
import React from 'react';
import './MainHome.scss';
import i18n from '../../i18n';
import GlobalService from '../../services/Global/Global.service';
import { useHistory } from 'react-router-dom';

const MainHome: React.FC = () => {
    const history = useHistory();

    return (
        <div className='main-home'>
            <div className="main-home__container">
                <h1 className="main-home__title">
                    {i18n.t( 'main-home.title' )}
                </h1>
                <p>
                    {i18n.t( 'main-home.description' )}
                </p>
                <div className='main-home__btn'>
                    <Button
                        onClick={ (): void => history.push( GlobalService.states.summer ) }
                        variant='outlined'
                        color='primary'
                        size='large'>
                        {i18n.t( 'main-home.summer-edition' )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MainHome;
