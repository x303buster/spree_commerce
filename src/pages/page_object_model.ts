import { Page } from '@playwright/test';
import { MainPage } from '#src/pages/main_page';

export class PageObjectModel {
    private readonly page: Page;
    public readonly mainPage: MainPage;

    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(page);
    }
}