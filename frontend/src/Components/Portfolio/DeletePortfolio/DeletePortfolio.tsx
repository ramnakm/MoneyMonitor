import * as React from 'react';

interface IDeletePortfolioProps {
    onPortfolioDelete: (e: React.SyntheticEvent)=>void;
    portfolioValue: string;
}

export const DeletePortfolio: React.FC<IDeletePortfolioProps> = ({onPortfolioDelete,portfolioValue}) => {
    return (
        <form onSubmit={onPortfolioDelete}>
            <input hidden={true} value={portfolioValue}></input>
            <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
          X
        </button>
        </form>
    );
};
