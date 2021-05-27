Feature: Keyboard

  Scenario: Escape from album to home
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    When I press escape
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Escape from photo to album
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    And I click on "Grace Bay"
    And I wait 1 second
    When I press escape
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Escape from photo all the way to home
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second
    And I click on "Grace Bay"
    And I wait 1 second
    When I press escape
    And I wait 1 second
    And I press escape
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Escape from map to home
    Given I browse to "faganphotos.com"
    And I click on the map icon
    And I wait 1 second
    When I press escape
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020"
    And I see "Turks & Caicos"
