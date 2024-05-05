import { getPortfolioData, getPortfolioItemData, getPortfolioItems } from '@/app/lib/helper_functions';
import React from 'react';
import PublicationsComponent from './PublicationsComponent';
import { PortfolioData, PublicationsData } from '@/app/customTypes';

/**
 * return all possible slug values in an array like [{slug: 'first_blog'}, {slug: 'second_blog'}]
 */
export async function generateStaticParams() {
    const portfolioItems = getPortfolioItems();
    return portfolioItems.map((item) => ({
        itemType: item,
    }));
}

export async function generatePortfolioData({
    params,
}: PortfolioPageProps) {
    //Load the portfolio item metadata using helper_functions.ts
    const metadata = await getPortfolioItemData(params.itemType);
    if (metadata) {
        return metadata;
    }
    return []; //Default return.
}

type PortfolioPageProps = {
    params: { itemType: string };
};

export default async function PortfolioPage({ params }: PortfolioPageProps) {
    const data = await generatePortfolioData({ params });

    const content = (data: PortfolioData) => {
        switch (params.itemType) {
            case "publications":
                const publicationsData = data as PublicationsData[]; // Convert data to type PublicationsData[]
                return (
                    <PublicationsComponent data={publicationsData} />
                );
            default:
                break;
        }
    }

    return (
        <div>
            <h1>{params.itemType}</h1>
            <p>Welcome to my portfolio! Here, you can learn more about my projects and experiences.</p>
            {content(data)}
        </div>
    );
}