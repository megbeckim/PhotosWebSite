Feature: Photos page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second

#  @wip
# after clicking on the arrow icons, escape doesn't work!!!!
# actually, it does, but the test doesn't!!!!
  @ignore
  Scenario: Navigate backward through many photos then click back to album to see it scrolled
    Given I scroll down 400 pixels
    And I click on "Dive Two"
    And I wait 1 second
    And I click on the angle-left icon
    And I click on the angle-left icon
    And I click on the angle-left icon
    And I click on the angle-left icon
    And I wait 1 second
    When I press escape
    And I wait 4 seconds
    Then I see "Dive One"

  @ignore
  Scenario: Navigate backward using arrows through many photos then click back to album to see it scrolled
    Given I scroll down 400 pixels
    And I click on "Dive Two"
    And I press left arrow
    And I press left arrow
    And I press left arrow
    And I press left arrow
    When I press escape
    Then I see "Dive One"
