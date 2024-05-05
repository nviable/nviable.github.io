import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "About Me",
    description: "desc",
};

const AboutPage: React.FC = () => {
    return (
        <div>
            <h1><FontAwesomeIcon className="w-6 h-6 inline-block" icon={faCoffee} /> About Me</h1>
            <p>Welcome to my website! Here, you can learn more about me and my interests.</p>
            {/* Add your content here */}
        </div>
    );
};

export default AboutPage;