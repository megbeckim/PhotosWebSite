Feature: Open URL

  Scenario: Load site
    When I browse to "faganphotos.com"
    Then the title is "Fagan Photos"
    And I see "FaganPhotos.com"
    And I see "2020"
    And I see "Turks & Caicos"

  Scenario: Load album
    When I browse to "faganphotos.com/#/album/2020%20Turks%20&%20Caicos"
    Then the title is "Fagan Photos"
    And I see "2020 Turks & Caicos"
    And I see "Grace Bay"

  Scenario: Load picture
    When I browse to "faganphotos.com/#/album/2020%20Turks%20&%20Caicos/photo/0"
    Then the title is "Fagan Photos"
    And I see "The resort"