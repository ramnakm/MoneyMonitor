import * as React from 'react';
import { Hero } from '../../Components/Hero/Hero';

interface IHomePageProps {
}

export const HomePage: React.FC<IHomePageProps> = (props) => {
    return (
      <div>
        <Hero />
      </div>
    );
};
