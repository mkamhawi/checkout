Feature: Place an order

  Scenario Outline: Reject placing an order for an invalid shipping date
    Given The cartId is <cartId>
    And The cardId is <cardId>
    And The shippingDate is <shippingDate>
    When I call POST order route
    Then The POST order route returns statusCode <statusCode>

    Examples:
        | statusCode | shippingDate   | cartId                                     | cardId                                 |
        | 400        | '2020-02-02'   | '9746d88d-8c5b-47d0-ade5-cce56a7ac781'     | '33921489-60ad-4d5f-8aa0-e5c9ce601393' |

  Scenario Outline: Place order for a valid request
    Given The cartId is <cartId>
    And The cardId is <cardId>
    And The shippingDate is <shippingDate>
    When I call POST order route
    Then The POST order route returns statusCode <statusCode>
    And The response contains expected params

    Examples:
        | statusCode | shippingDate   | cartId                                     | cardId                                 |
        | 200        | '2033-02-02'   | '9746d88d-8c5b-47d0-ade5-cce56a7ac781'     | '33921489-60ad-4d5f-8aa0-e5c9ce601393' |