Feature: trade items
  As a signed-in user
  I want to trade items with my friends

  Background:
    And I am on the homepage

  Scenario: select a friend for trading
    Given I am signed in with username "USER" and password "PASSWORD"
    Then I am on the "main" page
    When I press the "friend list" button
    Then I am on the "friend list" page
    When I press the "trade items" button
    Then I am on the "trade items" page
    When I select a friend listed on this page
    Then they will receive a 'trade'-request

  Scenario: friend refuses the request
    Given the friend is refusing the request
    Then I will receive a pop-up
    Then And I get informed that the request was declined


  Scenario: friend accepts request
    Given the friend is accepting the request
    Then players will see the trade menu
    Then I can select the cards I want to trade
    Then I see the cards my friend selects


  Scenario: either player aborts the trade action
    Given either player clicks on the 'cancel trade' button
    Then both users receive a pop-up which says 'Trade cancelled'

  Scenario: both players click on the 'accept trade' button
    Given both players click on the 'accept trade' button
    Then I will receive a pop-up which says 'Trade successfully'
    Then I can find my new items in the inventory