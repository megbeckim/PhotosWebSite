Feature: Home page

  Background:
    Given I browse to "faganphotos.com"
    And I wait 1 second

  Scenario: Browse to home
    Then the title is "Fagan Photos"
    And the screen matches the 'FaganPhotos' screenshot

  Scenario: Scroll down past home header
    When I scroll down 100 pixels
    Then the screen matches the 'Home without header' screenshot

  Scenario: Scroll down past first row of albums
    When I scroll down 400 pixels
    Then the screen matches the 'Home scrolled down without header' screenshot

  Scenario: Scroll back up quickly to see home header
    Given I scroll down 400 pixels
    When I scroll up 6 pixels
    Then the screen matches the 'Home scrolled down with header' screenshot

  Scenario: Scroll up slowly to not see home header
    Given I scroll down 405 pixels
    When I scroll up 5 pixels
    Then the screen matches the 'Home scrolled down without header' screenshot

  Scenario: Scroll to top
    Given I scroll down 400 pixels
    When I scroll up 400 pixels
    Then the screen matches the 'FaganPhotos' screenshot

  Scenario: Go from home to album
    When I click on "Turks & Caicos"
    And I move the mouse to the top left corner
    Then the screen matches the 'T&C album' screenshot

  Scenario: Go from home to map
    When I click on the globe icon
    Then the screen matches the 'Map' screenshot

  @ignore
  Scenario: Make fullscreen
    When I click on the expand icon
    Then ... i wonder if the screen shot resolution would be different?