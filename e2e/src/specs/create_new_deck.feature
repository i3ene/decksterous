Feature: Create new decks
  As a signed-in user
  I want to create a new deck
  to play with.

  Background:
  I am on the homepage

  Scenario: open the inventory page
    Given I am signed in with username "USER" and password "PASSWORD"
    Then I am on the "main" page
    When I press the "inventory" button
    Then I am on the "inventory" page

  Scenario: enter valid data and save the operation
    Given I am signed in with username "USER" and password "PASSWORD"
    Then I am on the "inventory" page
    When I select "create new deck"
    Then I enter a "deck name"
    When I press "select cards"
    Then I add cards to the deck
    Then I press the "create new deck" button
    Then I am back again on the "inventory" page
    Then I receive a "success" message