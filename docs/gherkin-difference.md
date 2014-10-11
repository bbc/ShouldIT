# What is the difference between ShouldIT? and Cucumber/Gherkin based BDD tools

What Gherkin based BDD tools do well is take a user journey or story and make that the focal point of their feature files. 

Through experience we have found that this can be hard to articulate as tests because most developers write their automated tests in a way that the system or system component is being focussed on.

One huge benefit to this is that automated tests that you create for your `ShouldIT?` features can be done using the same technologies `as is` as you would in your traditional test suite.

There is no need for an extra layer to express the steps in a manner that perhaps only Gherkin based BDD frameworks understand.

Below is an example of how these could differ.

## Gherkin Example
```
As an online shopper
I want to add products to the basket
So I can then purchase them when I have decided I have chosen all the items I wish to purchase

    scenario: Add to cart
        Given there is an product named "fashionable shoes"
        And the price is 34.95
        When I add the product to the shopping basket
        Then I should be redirected to the basket
        And I should see the item, price and  in the cart
```

## ShouldIT? Example
```
# Online Shop

## Basket

### Adding A Product

For example the user adds a pair of "fashionable shoes" at the price of 34.95

    + IT redirects to the user to the basket
    + IT displays the product price and quantity
```

## Basket

Although these are similar examples and both handle the scenario in similar levels of detail. ShouldIT? separates the requirements so that they are easier to distinguish. There is more freedom to build up the tests as the developer decides rather than the framework deciding.