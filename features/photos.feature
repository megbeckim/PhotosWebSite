Feature: Photos page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I click on "Grace Bay"
    And I wait 1 second

  Scenario: Browse to photos
    Then the title is "Fagan Photos"
    And I see "The resort"
    And I see the images icon
    And I see the angle-right icon
    And I don't see the angle-left icon

  Scenario: click arrow right
    When I click on the angle-right icon
    And I wait 1 second
    Then I see "Multicoloured bougainvillea"
    And I see the images icon
    And I see the angle-right icon
    And I see the angle-left icon

  Scenario: click arrow left
    Given I click on the angle-right icon
    And I wait 1 second
    When I click on the angle-left icon
    And I wait 1 second
    And I see "The resort"
    And I see the images icon
    And I see the angle-right icon
    And I don't see the angle-left icon

  Scenario: decorations disappear

  Scenario: decorations reappear

  Scenario: decorations reappear

  Scenario: arrow right

  Scenario: arrow right at end

  Scenario: arrow left

  Scenario: arrow left at start

  Scenario: no right arrow at end

  Scenario: no left arrow at start

  Scenario: Click back to album

  Scenario: navigate then click back to album

  Scenario: Escape back to album

  Scenario: navigate then escape back to album
