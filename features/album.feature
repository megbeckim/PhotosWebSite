Feature: Album page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"

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
    Then I see "2020 Turks & Caicos"
    And I don't see "Grace Bay"

  Scenario: Scroll up slowly to not see header
    Given I scroll down 400 pixels
    When I scroll up 5 pixels
    Then I don't see "2020 Turks & Caicos"
    And I don't see "Grace Bay"

  Scenario: Scroll to top
    Given I scroll down 400 pixels
    When I scroll up 400 pixels
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Go from album to photo
    When I click on "Grace Bay"
    Then the title is "Fagan Photos"
    And I see "The resort"

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