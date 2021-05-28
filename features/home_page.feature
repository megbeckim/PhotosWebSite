Feature: Home page

  Scenario: Browse to home
    When I browse to "faganphotos.com"
    Then the title is "Fagan Photos"
    And I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Scroll down on home
    Given I browse to "faganphotos.com"
    And I see "FaganPhotos.com"
    When I scroll down 100 pixels
    Then I don't see "FaganPhotos.com"

  Scenario: Go from home to album
    Given I browse to "faganphotos.com"
    When I click on "Turks & Caicos"
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Go from home to map
    Given I browse to "faganphotos.com"
    When I click on the globe icon
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "Visited"
    And I see "To visit"

  @ignore
  Scenario: Make fullscreen
    Given I browse to "faganphotos.com"
    When I click on the expand icon
    Then ...