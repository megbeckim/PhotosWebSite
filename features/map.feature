Feature: Map

  Background:
    Given I browse to "faganphotos.com"
    And I click on the globe icon

  Scenario: Click back to home
    When I wait 1 second
    And I click on the home icon
    Then the screen matches the 'FaganPhotos' screenshot

  Scenario: Escape back to home
    When I wait 1 second
    And I press escape
    Then the screen matches the 'FaganPhotos' screenshot

