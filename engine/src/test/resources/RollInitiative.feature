Feature: Roll Initiative

  Scenario: roll initiative without monster
    When I roll initiative
    Then The list size is 0

  Scenario: roll initiative with 1 monster with no initiative
    Given 1 default monsters are created
    And I roll initiative
    Then the monster initiative takes a value

  Scenario: roll initiative with multiple monster with no initiative
    Given 42 default monsters are created
    And I roll initiative
    Then the monster initiative takes a value

  Scenario: roll initiative with 1 monster with an initiative
    Given A monster named "toto" with 10 initiative
    And I roll initiative
    Then "toto"'s initiative is 10

  Scenario: roll initiative with multiple monster with an initiative
    Given 42 default monsters are created
    And A monster named "toto" with 15 initiative
    And I roll initiative
    Then "toto"'s initiative is 15

  Scenario: roll initiative with 2 monster with and without initiative
    Given A monster named "foo" with 1 initiative
    And A monster named "bar" with None initiative
    And I roll initiative
    Then "foo"'s initiative is 1
    And "bar" has Some initiative

