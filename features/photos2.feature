Feature: Photos page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I wait 1 second

#  @wip
# after clicking on the arrow icons, escape doesn't work!!!!
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
