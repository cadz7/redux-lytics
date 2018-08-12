# Redux-lytics allows 

Which Actions do we log:
1. Log all the actions(including the payload?) to be queried later.

    **Benefits**: If it happens at a later time that we want to identify some behaviour, we can try and find a query consisting of a series of actions, without the need to instrument first and then wait for the data.

    **Cons**: increased bandwidth - don't know how much of a problem it is
2. Log some actions specified through the *portal*(some kind of web menu?)

    **Benefits**: less bandwidth?

Potential issues:
1. Redux actions change overtime, therefore in some cases it would be impossible to track certain behaviours over time without some kind of instrumentation on the *portal*(some querying language allowing logical operators)
