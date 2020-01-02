Feature: Quote of the day
  Get the quote of the day and share it to the world

  Background:
    Given Some quotes exist:
      | id                       | content                                                                | author              | tags            | provider       |
      | W5EcObayalp77mj4P2T28AeF | Do not let what you cannot do interfere with what you can do.          | John Wooden         | inspire,ability | theysaidso.com |
      | DpEEVUKSlOEe3_PkAuAm_geF | Without art, the crudeness of reality would make the world unbearable. | George Bernard Shaw | art,reality     | theysaidso.com |

  Scenario Outline: Create a message from the quote of the day
    Given I have the quote of the day "<id>"
    When I create a message from the quote
    Then It is shared to the world
      And The message with id "<id>" should have the following body "<content> - <author> <formatted_tags> (Provided by <provider>)"

    Examples:
      | id                       | content                                                                | author              | formatted_tags                   | provider       |
      | W5EcObayalp77mj4P2T28AeF | Do not let what you cannot do interfere with what you can do.          | John Wooden         | #quoteOfTheDay #inspire #ability | theysaidso.com |
      | DpEEVUKSlOEe3_PkAuAm_geF | Without art, the crudeness of reality would make the world unbearable. | George Bernard Shaw | #quoteOfTheDay #art #reality     | theysaidso.com |


