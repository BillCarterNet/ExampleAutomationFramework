Feature: Navigation

    @ID-3 @desktop 
    Scenario Outline: [Desktop] A user can reach the contact us page from the "<link_location>"

    Given I am on the homepage
    When I click Contact us in the "<link_location>"
    Then I am taken to the Contact us page

    Examples:
    | link_location |
    | header        |
    | footer        |

    @ID-3 @mobile
    Scenario Outline: [Mobile] A user can reach the contact us page from the "<link_location>"

    Given I am on the homepage
    When I click Contact us in the "<link_location>"
    Then I am taken to the Contact us page

    Examples:
    | link_location |
    | header        |
    | footer        |

    @ID-3 @tablet 
    Scenario Outline: [Tablet] A user can reach the contact us page from the "<link_location>"

    Given I am on the homepage
    When I click Contact us in the "<link_location>"
    Then I am taken to the Contact us page

    Examples:
    | link_location |
    | header        |
    | footer        |

