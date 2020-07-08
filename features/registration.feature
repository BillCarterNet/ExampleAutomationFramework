Feature: Regsitration

    @ID-1 @desktop @ignore
    Scenario: A user can register on the site

    Given I am on the homepage
    When I click "Sign in" in the header
    And I enter and un-registered email
    And I click Create an account
    And I fill in the registration form
    And I click register
    Then I am taken to my account page

    @ID-2 @desktop @ignore
    Scenario Outline: Scenario Outline name: A user can register on the site "<ex_no>"

    Given I am on the homepage
    When I click "Sign in" in the header
    And I enter and un-registered email
    And I click Create an account
    And I enter my title as "<myTitle>"
    And I enter my name as "<myFirstName>" and "<myLastName>"
    And I enter my password as "<myPassword>"
    And I enter my date of birth as "<myDob>"
    And I tick the mailing options for "<myNewsletter>" and "<myOffers>"
    And I enter my company as "<myCompany>"
    And I enter my address as "<myAddress>", "<myAddress2>", "<myCity>", "<myState>", "<myZipPostalCode>", "<myCountry>"
    And I enter my additional info as "myAdditionalInfo"
    And I enter my phone numbers as "<myHomePhone>" and "<myMobilePhone>"
    And I enter my address alias as "<myAddressAlias>"
    And I click register
    Then I am taken to my account page
    And my entered personal information is displayed correctly on the my personal informtion page
    And my entered address is displayed correctly on the my address page

    Examples:
    | ex_no | myTitle | myFirstName | myLastName | myPassword | myDob            | myNewsletter | myOffers   | myCompany                  | myAddress               | myAddress2    | myCity        | myState    | myZipPostalCode | myCountry     | myAdditionalInfo | myHomePhone     | myMobilePhone   | myAddressAlias       |  
    | 1     | mr      | Brad        | Pitt       | bill1984   | 18 December 1963 | ticked       | not ticked | Plan B Entertainment       | 9150 Wilshire Boulevard |               | Beverly Hills | California | 90210           | United States | lorem ipsum      | +1-202-555-0191 |                 | Plan B Entertainment |                   
    | 2     | mrs     | Angelina    | Jolie      | bill1984   | 4 June 1975      | not ticked   | ticked     | JOLIE PAS PRODUCTIONS, LLC | 1990 S BUNDY DR STE 200 |               | LOS ANGELES   | California | 90025           | United States | lorem ipsum      |                 | +1-202-555-0191 | JOLIE PAS            |





