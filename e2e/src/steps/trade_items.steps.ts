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

/** select a friend for trading **/

Given("Given I am signed in with username {string} and password {string}", async (x: string, y: string) => {
  //TODO
});

Then("I am on the {string} page", async (x: string) => {
  //TODO
});

When("I press the {string} button", async (x: string) => {
  //TODO
});



When("I select a friend listed on this page", async () => {
  //TODO
});

Then("they will receive a {string}-request", async (x: string) => {
  //TODO
});


/** friend refuses the request **/

Given("the friend is refusing the request", async () => {
  //TODO
});

Then("I will receive a pop-up", async () => {
  //TODO
});

Then("And I get informed that the request was declined", async () => {
  //TODO
});


/** friend accepts request **/

Given("the friend is accepting the request", async () => {
  //TODO
});

Then("players will see the trade menu", async () => {
  //TODO
});

Then("I can select the cards I want to trade", async () => {
  //TODO
});

Then("I see the cards my friend selects", async () => {
  //TODO
});


/** either player aborts the trade action **/

Given("either player clicks on the {string} button", async (x: string) => {
  //TODO
});

Then("both users receive a pop-up which says {string}", async (x: string) => {
  //TODO
});


/** both players click on the 'accept trade' button **/

Given("both players click on the {string} button", async (x: string) => {
  //TODO
});

Then("I will receive a pop-up which says {string}", async (x: string) => {
  //TODO
});

Then("I can find my new items in the inventory", async () => {
  //TODO
});