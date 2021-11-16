Feature: Home page

  Background:
    Given I browse to "faganphotos.com"
    And I wait 1 second

  Scenario: Browse to home
    Then the title is "Fagan Photos"
    And I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Scroll down past header
    When I scroll down 100 pixels
    Then I don't see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Scroll down past first row of albums
    When I scroll down 400 pixels
    Then I don't see "FaganPhotos.com"
    And I don't see "2020"
    And I don't see "Turks & Caicos"

  Scenario: Scroll back up quickly to see header
    Given I scroll down 400 pixels
    When I scroll up 6 pixels
    Then I see "FaganPhotos.com"
    And I don't see "2020"
    And I don't see "Turks & Caicos"

  Scenario: Scroll up slowly to not see header
    Given I scroll down 400 pixels
    When I scroll up 5 pixels
    Then I don't see "FaganPhotos.com"
    And I don't see "2020"
    And I don't see "Turks & Caicos"

  Scenario: Scroll to top
    Given I scroll down 400 pixels
    When I scroll up 400 pixels
    Then I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Go from home to album
    When I click on "Turks & Caicos"
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Go from home to map
    When I click on the globe icon
    Then the title is "Fagan Photos"
    And I see "Visited"
    And I see "To visit"

  @ignore
  Scenario: Make fullscreen
    When I click on the expand icon
    Then ...