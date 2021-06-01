Feature: Map

  Background:
    Given I browse to "faganphotos.com"
    And I click on the globe icon

  Scenario: Click back to home
    When I wait 1 second
    And I click on the home icon
    Then the title is "Fagan Photos"
    And I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Escape back to home
    When I wait 1 second
    When I press escape
    Then the title is "Fagan Photos"
    And I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

