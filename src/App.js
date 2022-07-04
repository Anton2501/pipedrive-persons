import React from 'react';
import Header from '~components/header';
import SubHeader from '~components/subheader';
import PersonsList from '~components/persons-list';
import './App.scss';

function App() {
    return (
        <div className="App">
            <Header />
            <SubHeader />
            <main>
                <div className="main-container">
                    <PersonsList />
                </div>
            </main>
        </div>
    );
}

export default App;
