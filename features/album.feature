Feature: Album page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second

  Scenario: Browse to album
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Scroll down past header
    When I scroll down 100 pixels
    Then I don't see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Scroll down past first row of photos
    When I scroll down 200 pixels
    Then I don't see "2020 Turks & Caicos"

  Scenario: Scroll back up quickly to see header
    Given I scroll down 400 pixels
    When I scroll up 6 pixels
    And I wait 1 second
    Then I see "2020 Turks & Caicos"
    And I don't see "Grace Bay"

  Scenario: Scroll up slowly to not see header
    Given I scroll down 400 pixels
    When I scroll up 5 pixels
    And I wait 1 second
    Then I don't see "2020 Turks & Caicos"
    And I don't see "Grace Bay"

  Scenario: scroll to top
    Given I scroll down 400 pixels
    When I scroll up 400 pixels
    And I wait 1 second
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Go from album to photo
    When I click on "Grace Bay"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "The resort"

  Scenario: Click back to home
  Scenario: Escape back to home