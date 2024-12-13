import * as React from 'react';
import { CardPortfolio } from '../CardPortfolio/CardPortfolio';
import { PortfolioGet } from '../../../Models/Portfolio';

interface IListPorfolioProps {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: React.SyntheticEvent)=>void;
}

export const ListPortfolio: React.FC<IListPorfolioProps> = ({portfolioValues,onPortfolioDelete}) => {
    return (
      <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Portfolio
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioValues.length > 0 ? (
            portfolioValues.map((portfolioValue) => {
              return (
                <CardPortfolio
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
    );
};
