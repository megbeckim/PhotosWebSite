Feature: Basic navigation

  Scenario: Navigate from album to photo
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    When I click on "Grace Bay"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "The resort"
