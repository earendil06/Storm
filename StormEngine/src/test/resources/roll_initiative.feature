Feature: Initiative Engine

  # Roll Initiative

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

  # Next Turn

  Scenario: Next turn with no monster
    When Next turn is called
    Then The monster list size is 0
    And The playing monster is ""

  Scenario: Next turn with one monster without initiative
    Given A monster named "foo" with None initiative
    And Next turn is called
    Then The playing monster is ""

  Scenario: Next turn with one monster without initiative and initiative rolled
    Given A monster named "foo" with None initiative
    And I roll initiative
    Then The playing monster is ""

  Scenario: Next turn with one monster without initiative and initiative rolled and next turn
    Given A monster named "foo" with None initiative
    And I roll initiative
    And Next turn is called
    Then The playing monster is "foo"

  Scenario: Multiple next turn with one monster with initiative
    Given A monster named "foo" with 2 initiative
    And I roll initiative
    And Next turn is called
    And Next turn is called
    And Next turn is called
    Then The playing monster is "foo"

  Scenario: Next turn with 2 monsters with one with initiative
    Given A monster named "foo" with None initiative
    And A monster named "bar" with 14 initiative
    And Next turn is called
    Then The playing monster is "bar"

  Scenario: Multiple next turn with multiple monsters without initiative
    Given A monster named "foo" with None initiative
    And A monster named "bar" with None initiative
    And Next turn is called
    And Next turn is called
    And Next turn is called
    Then The playing monster is ""

  Scenario: Multiple monsters with initiative and no next turn
    Given A monster named "foo" with 11 initiative
    And A monster named "bar" with 10 initiative
    And I roll initiative
    And Next turn is called
    Then The playing monster is "foo"

  Scenario: Multiple monsters with initiative and 1 next turn
    Given A monster named "foo" with 11 initiative
    And A monster named "bar" with 10 initiative
    And Next turn is called
    Then The playing monster is "foo"

  Scenario: Multiple monsters with initiative and 2 next turn
    Given A monster named "foo" with 11 initiative
    And A monster named "bar" with 10 initiative
    And Next turn is called
    And Next turn is called
    Then The playing monster is "bar"

  Scenario: Multiple monsters with initiative and 3 next turn
    Given A monster named "bar" with 10 initiative
    And A monster named "foo" with 11 initiative
    And Next turn is called
    And Next turn is called
    And Next turn is called
    Then The playing monster is "foo"