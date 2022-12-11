// Import the cucumber operators we need
import { Before, Given, Then, When } from '@cucumber/cucumber';
import { AppPage } from '../app.po';
import { by, element, protractor } from 'protractor';
import { expect } from 'chai';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

const name: string = 'deckname';

/** open the inventory page **/

Given('Given I am signed in with username {string} and password {string}', async (un: string, pw: string) => {
  const username = un;
  const password = pw;
});

Then('I am on the {string} page', async (x: string) => {
  await page.navigateTo();
});

When('I press the {string} button', async (x: string) => {
  const inventoryButton = element(by.id(x));
  inventoryButton.click();
});

/** enter valid data and save the operation **/

When('I select {string}', async (x: string) => {
  const selectNewDeck = element(by.id(x));
  selectNewDeck.click();
});

Then('I enter a {string}', async (name) => {
  const deckName = element(by.id('deckName'));
  deckName.sendKeys(name);
  expect(await deckName.getAttribute('value')).to.equal(name);
});

When('I press {string}', async (x: string) => {
  const selectCards = element(by.id(x));
  selectCards.click();
});

Then('I add cards to the deck', async () => {
  //TODO
});

Then('I am back again on the {string} page', async (x: string) => {
  await page.navigateTo();
});

Then('I receive a {string} message', async (x: string) => {
  //TODO
});
