// Import the cucumber operators we need
import { Before, Given, Then, When } from '@cucumber/cucumber';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';
import { expect } from 'chai';

let page: AppPage;
let EC = protractor.ExpectedConditions;

Before(() => {
  page = new AppPage();
});

/** select a friend for trading **/

Given('Given I am signed in with username {string} and password {string}', async (x: string, y: string) => {
  const username: string = x;
  const password: string = y;
});

Then('I am on the {string} page', async (x: string) => {
  await page.navigateTo();
});

When('I press the {string} button', async (x: string) => {
  const friendButton = element(by.id(x));
  friendButton.click();
});

When('I select a friend listed on this page', async () => {
  const friend = element(by.id('friend'));
  friend.click();
});

Then('they will receive a {string}-request', async (x: string) => {
  //TODO
});

/** friend refuses the request **/

Given('the friend is refusing the request', async () => {
  const refuseButton = element(by.id('refuseButton'));
  refuseButton.click();
  expect(await refuseButton.isSelected()).to.true;
});

Then('I will receive a pop-up that says {string}', async (x: string) => {
  const popup = element(by.id('popup'));
  browser.wait(EC.presenceOf(popup), 5000);
  expect(await popup.isPresent()).to.true;
  expect(await popup.getText()).to.equal(x);
});

Then('And I get informed that the request was declined', async () => {
  //TODO
});

/** friend accepts request **/

Given('the friend is accepting the request', async () => {
  const acceptButton = element(by.id('acceptButton'));
  acceptButton.click();
  expect(await acceptButton.isSelected()).to.true;
});

Then('players will see the trade menu', async () => {
  //TODO
});

Then('I can select the cards I want to trade', async () => {
  //TODO
});

Then('I see the cards my friend selects', async () => {
  //TODO
});

/** either player aborts the trade action **/

Given('either player clicks on the {string} button', async (x: string) => {
  const abortButton = element(by.id(x));
  abortButton.click();
});

Then('both users receive a pop-up which says {string}', async (x: string) => {
  const popup = element(by.id('popup'));
  browser.wait(EC.presenceOf(popup), 5000);
  expect(await popup.isPresent()).to.true;
  expect(await popup.getText()).to.equal(x);
});

/** both players click on the 'accept trade' button **/

Given('both players click on the {string} button', async (x: string) => {
  const acceptTradeButton = element(by.id(x));
  acceptTradeButton.click();
});

Then('I will receive a pop-up which says {string}', async (x: string) => {
  const popup = element(by.id('popup'));
  browser.wait(EC.presenceOf(popup), 5000);
  expect(await popup.isPresent()).to.true;
  expect(await popup.getText()).to.equal(x);
});

Then('I can find my new items in the inventory', async () => {
  //TODO
});
