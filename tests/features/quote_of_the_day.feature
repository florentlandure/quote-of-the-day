Feature: Quote of the day
  Get the quote of the day and share it to the world

  Scenario Outline: Share the quote of the day
    Given The time parameters "<current_hour>", "<start_hour>" and "<end_hour>"
      And Time "<current_hour>" is between "<start_hour>" and "<end_hour>"
      And I have not shared a quote today
    When I get the quote of the day
    Then It shares it to the world

    Examples:
      | start_hour | end_hour | current_hour |
      | 8          | 22       | 9            |
      | 8          | 22       | 21           |

  Scenario Outline: Do not share the quote of the day during the night
    Given The time parameters "<current_hour>", "<start_hour>" and "<end_hour>"
      And Time "<current_hour>" is not between "<start_hour>" and "<end_hour>"
    When I get the quote of the day
    Then Do not share the quote of the day

    Examples:
      | start_hour | end_hour | current_hour |
      | 8          | 22       | 4            |
      | 8          | 22       | 23           |

  Scenario Outline: Do not share the quote of the day twice
    Given The time parameters "<current_hour>", "<start_hour>" and "<end_hour>"
      And Time "<current_hour>" is between "<start_hour>" and "<end_hour>"
      And I have shared a quote today
    Then Do not share the quote of the day

    Examples:
      | start_hour | end_hour | current_hour |
      | 8          | 22       | 9            |
      | 8          | 22       | 21           |
