Feature: Album page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I move the mouse to the top left corner

  Scenario: Browse to album
    Then the screen matches the 'T&C album' screenshot

  Scenario: Scroll down past albumheader
    When I scroll down 100 pixels
    Then the screen matches the 'T&C album without header' screenshot

  Scenario: Scroll down past first row of photos
    When I scroll down 200 pixels
    Then the screen matches the 'T&C album scrolled down' screenshot

  Scenario: Scroll back up quickly to see album header
    Given I scroll down 400 pixels
    When I scroll up 6 pixels
    Then the screen matches the 'T&C album scrolled down with header' screenshot

  Scenario: Scroll up slowly to not see album header
    Given I scroll down 400 pixels
    When I scroll up 5 pixels
    Then the screen matches the 'T&C album scroll up without header' screenshot

  Scenario: Scroll to top
    Given I scroll down 400 pixels
    When I scroll up 400 pixels
    Then the screen matches the 'T&C album' screenshot

  Scenario: Go from album to photo
    When I click on "Grace Bay"
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: Click back to home
    When I wait 1 second
    And I click on the home icon
    Then the screen matches the 'FaganPhotos' screenshot

  Scenario: Escape back to home
    When I wait 1 second
    When I press escape
    Then the screen matches the 'FaganPhotos' screenshot