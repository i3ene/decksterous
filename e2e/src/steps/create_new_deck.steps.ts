// Import the cucumber operators we need
import { Before, Given, Then, When } from "@cucumber/cucumber";
import { AppPage } from "../app.po";
import { element, by, protractor, browser } from "protractor";
import { expect } from "chai";

let page: AppPage;
let EC = protractor.ExpectedConditions;

Before(() => {
  page = new AppPage();
});

/** open the inventory page **/

Given("Given I am signed in with username {string} and password {string}", async (x: string, y: string) => {
  //TODO
});

Then("I am on the {string} page", async (x: string) => {
  //TODO
});

When("I press the {string} button", async (x: string) => {
  //TODO
});


/** enter valid data and save the operation **/

When("I select {string}", async (x: string) => {
  //TODO
});

Then("I enter a {string}", async (x: string) => {
  //TODO
});

When("I press {string}", async (x: string) => {
  //TODO
});

Then("I add cards to the deck", async () => {
  //TODO
});

Then("I am back again on the {string} page", async (x: string) => {
  //TODO
});

Then("I receive a {string} message", async (x: string) => {
  //TODO
});