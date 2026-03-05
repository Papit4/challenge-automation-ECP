import { Page, Locator } from '@playwright/test';

export class WikipediaPage {
    readonly page: Page;
    readonly mainTitle: Locator;
    readonly creatorValue: Locator;
    readonly infoboxImage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mainTitle = page.locator('h1#firstHeading');


        this.creatorValue = page.locator('.infobox-caption').first();

        this.infoboxImage = page.locator('table.infobox img').first();
    }

    async navigate(pokemonName: string) {
        const formattedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();
        await this.page.goto(`https://en.wikipedia.org/wiki/${formattedName}`);
    }

    async getTitleText(): Promise<string> {
        return await this.mainTitle.innerText();
    }

    async getCreatorText(): Promise<string> {
        return await this.creatorValue.innerText();
    }

    async getImageElement(): Promise<Locator> {
        return this.infoboxImage;
    }
}