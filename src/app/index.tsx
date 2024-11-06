import React, { useState } from 'react';
import './app.css';
import Header from './header';
import Footer from './footer';
import Home from './home';
import InviteForm from './invite-form';

function App() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const onSetModalOpen = () => {
        setModalOpen(true);
    };
    const onSetModalClosed = () => {
        setModalOpen(false);
    };

    return (
        <div className="App">
            <Header />
            <Home openInviteForm={onSetModalOpen}/>
            <Footer />
            {modalOpen && <InviteForm onClose={onSetModalClosed}/>}
        </div>
    );
}

export default App;
