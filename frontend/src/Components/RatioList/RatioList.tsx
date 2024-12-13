import * as React from 'react';

interface IRatioListProps {
    config: any;
    data: any;
}

export const RatioList: React.FC<IRatioListProps> = ({config, data}) => {
    const renderedRow=config.map((row: any) => {
        return(
            <li className='py-3 sm:py-4'>
                <div className='flex items-center space-x-4'>
                    <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                            {row.label}
                        </p>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                            {row.subTitle}
                        </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-gray-900'>
                        {row.render(data)}
                    </div>
                </div>
            </li>
        )   
    }
)
    return (
      <div className='bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 w-full'>
        <ul className='divide-y divided-gray-200'>{renderedRow}</ul>
      </div>
    );
};
