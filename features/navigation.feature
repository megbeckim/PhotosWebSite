Feature: Basic navigation
  In order to do maths
  As a developer
  I want to increment variables

  Scenario: Navigate to album
    When I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Navigate to photo
    When I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    And I click on "Grace Bay"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "The resort"