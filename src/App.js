import React from 'react';
import API from '../api';
import './App.scss';

function App() {
    React.useEffect(() => {
        API().get('/persons?limit=2')
        .then(data => console.log(data));
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                text to test
            </header>
        </div>
    );
}

export default App;
