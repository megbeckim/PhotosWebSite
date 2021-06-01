Feature: Photos page

  Background:
    Given I browse to "faganphotos.com"
    And I click on "Turks & Caicos"
    And I click on "Grace Bay"
    And I wait 1 second

  Scenario: See the title
    Then the title is "Fagan Photos"

  Scenario: See the label
    Then I see "The resort"

  Scenario: See the album icon
    Then I see the images icon

  Scenario: See the next photo icon
    Then I see the angle-right icon

  Scenario: See the previous photo icon
    When I click on the angle-right icon
    And I wait 1 second
    Then I see the angle-right icon

  Scenario: Don't see the previous photo icon
    Then I don't see the angle-left icon

  Scenario: Click arrow right
    When I click on the angle-right icon
    And I wait 1 second
    Then I see "Multicoloured bougainvillea"

  Scenario: Click arrow left
    Given I click on the angle-right icon
    And I wait 1 second
    When I click on the angle-left icon
    And I wait 1 second
    And I see "The resort"

  Scenario: Decorations disappear
    When I wait 3 seconds
    Then I don't see "The resort"
    And I don't see the images icon
    And I don't see the angle-right icon
    And I don't see the angle-left icon

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
    When I press escape
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Escape back all the way to home
    When I press escape
    And I wait 1 second
    And I press escape
    And I wait 1 second
    Then the title is "Fagan Photos"
    And I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"
