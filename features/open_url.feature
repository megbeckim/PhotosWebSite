Feature: Open URL

  Scenario: Load site
    When I browse to "faganphotos.com"
    Then the screen matches the 'FaganPhotos' screenshot

  Scenario: Load album
    When I browse to "faganphotos.com/#/album/2020%20Turks%20&%20Caicos"
    Then the screen matches the 'T&C album' screenshot

  Scenario: Load picture
    When I browse to "faganphotos.com/#/album/2020%20Turks%20&%20Caicos/photo/0"
    Then the screen matches the 'T&C the resort' screenshot

  Scenario: Load map
    When I browse to "faganphotos.com/#/map"
      Then the screen matches the 'Map' screenshot