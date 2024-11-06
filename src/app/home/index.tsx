import React from 'react';
import './home.css';
import Button from '../../button';

interface Props {
    openInviteForm: () => void;
}

const Home = ({ openInviteForm }: Props) => {
    return <div className="home">
        <div className='content'>
            <div className="wrapper">
            <h2>A better way to  enjoy every day.</h2>
            <p>Would you like to know more about what is happening?</p>
            <Button onClick={openInviteForm} size="large">Request an invitation</Button>
            </div>
        </div>
    </div>;
}

export default Home;
