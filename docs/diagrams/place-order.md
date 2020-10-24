```mermaid
sequenceDiagram
    participant mb as mobile app
    participant bff as BFF
    participant checkout
    participant cart
    participant promotion
    participant payment
    participant db as database
    mb -->>+ bff: place order
        bff -->>+ checkout: place order
            checkout -->>+ cart: get cart products
            cart -->>- checkout: cart products
            alt promocode provided
                checkout -->>+ promotion: get promotion details
                promotion -->>- checkout: promotion details
            end
            Note over checkout: calculate total price
            checkout -->>+ payment: charge credit card
            payment -->>- checkout: credit card charged
            checkout -->>+ db: save order info
            db -->>- checkout: order info saved
        checkout -->>- bff: place order
    bff -->>- mb: place order
```