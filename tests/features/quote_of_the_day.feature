Feature: Quote of the day
  Get the quote of the day and share it to the world

  Scenario: Share the quote of the day
    Given I have the quote of the day
    When It creates a message from the quote
    Then It is shared to the world

# Examples
#      | id                       | content                                                                | author              | formatted_tags                   | provider       |
#      | W5EcObayalp77mj4P2T28AeF | Do not let what you cannot do interfere with what you can do.          | John Wooden         | #quoteOfTheDay #inspire #ability | theysaidso.com |
#      | DpEEVUKSlOEe3_PkAuAm_geF | Without art, the crudeness of reality would make the world unbearable. | George Bernard Shaw | #quoteOfTheDay #art #reality     | theysaidso.com |
