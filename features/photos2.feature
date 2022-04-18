Feature: Photos page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second

  Scenario: Navigate backward through many photos then click back to album to see it scrolled
    Given I scroll down 400 pixels
    And I click on "Dive Two"
    And I wait 1 second
    And I click on the angle-left icon
    And I wait 1 second
    And I click on the angle-left icon
    And I wait 1 second
    And I click on the angle-left icon
    And I wait 1 second
    And I click on the angle-left icon
    And I wait 1 second
    When I press escape
    And I move the mouse to the top left corner
    Then the screen matches the 'T&C album scrolled down with header revealed' screenshot

  Scenario: There is no right arrow at the last photo
    When I click on "Dive Two"
    And I wait 1 second
    And I click on the angle-right icon
    And I wait 1 second
    And I click on the angle-right icon
    And I wait 1 second
    And I click on the angle-right icon
    And I wait 1 second
    And I click on the angle-right icon
    And I wait 1 second
    And I click on the angle-right icon
    And I wait 1 second
    And I click on the angle-right icon
    And I wait 1 second
    And I click on the angle-right icon
    Then the screen matches the 'T&C safety stop' screenshot

  Scenario: Pressing the right arrow key at the end does nothing
    Given I click on "Dive Two"
    And I press right arrow
    And I wait 1 second
    And I press right arrow
    And I wait 1 second
    And I press right arrow
    And I wait 1 second
    And I press right arrow
    And I wait 1 second
    And I press right arrow
    And I wait 1 second
    And I press right arrow
    And I wait 1 second
    When I press right arrow
    Then the screen matches the 'T&C safety stop' screenshot
