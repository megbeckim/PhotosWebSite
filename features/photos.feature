Feature: Photos page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I click on "Grace Bay"
    And I wait 1 second

  Scenario: See the first photo with right and album icons, and caption
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: See the second photo with left, right, and album icons, and caption
    When I click on the angle-right icon
    Then the screen matches the 'T&C flowers' screenshot

  Scenario: Click arrow left on photo 2 goes back to photo 1
    Given I click on the angle-right icon
    And I wait 1 second
    When I click on the angle-left icon
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: Decorations disappear, as seen on photo 2
    Given I click on the angle-right icon
    When I wait 4 seconds
    Then the screen matches the 'T&C flowers undecorated' screenshot

  Scenario: Moving the mouse makes decorations reappear
    Given I wait 3 seconds
    When I move the mouse
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: Clicking makes decorations reappear
    Given I click on the angle-right icon
    And I wait 4 seconds
    When I click the mouse
    Then the screen matches the 'T&C flowers' screenshot

  Scenario: Press right arrow key at start
    When I press right arrow
    Then the screen matches the 'T&C flowers' screenshot

  Scenario: Press left arrow key at start
    Given I press right arrow
    And I wait 1 second
    When I press left arrow
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: Pressing the left arrow key at the start does nothing
    When I press left arrow
    And I wait 1 second
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: Click back to album
    When I click on the images icon
    And I move the mouse to the top left corner
    Then the screen matches the 'T&C album' screenshot

  Scenario: Navigate forward through many photos then click back to album to see it scrolled
    When I click on the angle-right icon
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
    And I wait 1 second
    And I click on the images icon
    Then the screen matches the 'T&C album scrolled down further' screenshot

  Scenario: Escape back to album
    When I press escape
    And I move the mouse to the top left corner
    Then the title is "Fagan Photos"
    Then the screen matches the 'T&C album' screenshot

  Scenario: Escape back all the way to home
    When I press escape
    And I wait 1 second
    And I press escape
    And I wait 1 second
    And I move the mouse to the top left corner
    Then the screen matches the 'FaganPhotos' screenshot