Feature: Basic navigation

  Scenario: Navigate from home to album
    Given I browse to "faganphotos.com"
    When I click on "Turks & Caicos"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Navigate from album to photo
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    When I click on "Grace Bay"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "The resort"

  Scenario: Navigate from home to map
    Given I browse to "faganphotos.com"
    When I click on the globe icon
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "Visited"
    And I see "To visit"