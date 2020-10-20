import React from 'react';
import logo from './logo.svg';
import './App.css';
import i18n from './i18n';

const App = (): JSX.Element => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {i18n.t( 'home.title' )}
                </a>
            </header>
        </div>
    );
};

export default App;
