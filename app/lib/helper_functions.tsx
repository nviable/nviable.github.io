import { readdirSync } from "fs";
import { PortfolioData } from "@/app/customTypes";

/**
 * Scan the portfolio directory and return an array of file names
 * @returns
 */
export function getPortfolioItems(): string[] {
    try {
        //Read the /protfolio folder at root dir
        const fileList: string[] = readdirSync("./data/portfolio/");
        //Return an array of filenames at this dir
        if (fileList.length > 0) {
            return fileList.map((file) => {
                //Remove extension
                return file.substring(0, file.lastIndexOf(".")) || file;
            });
        }
    } catch (error) { }
    return [];
}

/**
 * Get the metadata of a portfolio json
 * @param itemType
 * @returns
 */
export async function getPortfolioData(): Promise<PortfolioData[]> {
    try {
        //Read the /portfolio folder at root dir
        const fileList: string[] = readdirSync("./data/portfolio/");
        //Load each file
        if (fileList.length > 0) {
            const result = fileList.map(async (file) => {
                //Remove extension to get itemType
                const filename =
                    file.substring(0, file.lastIndexOf(".")) || file;
                //Tro to get metadata
                return { ...(await getPortfolioItemData(filename)), id: filename };
            });

            return Promise.all(result);
        }
    } catch (error) { }
    return [];
}

/**
 * Import a portfolio item json and return its contents
 */
export async function getPortfolioItemData(itemType: string): Promise<PortfolioData> {
    try {
        //Import the json file
        const data = await import(`../../data/portfolio/${itemType}.json`);
        return data.default;
    } catch (error) {
        return [{
            title: "",
            slug: "",
            description: "",
            url: "",
        }];
    }
}


