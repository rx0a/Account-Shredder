# Event Tracker Project 

## Overview
Many companies use [dark patterns](https://www.darkpatterns.org/) to make it difficult to find how to delete your account. This application aims to be a directory of urls to enable you to easily delete your account from web services.

## Technologies Used

* [Java](https://en.wikipedia.org/wiki/Java_)</br>
* [Object-Oriented design](https://stackabuse.com/object-oriented-design-principles-in-java)</br>
* [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer)<br>
* [Spring Framework](https://en.wikipedia.org/wiki/Spring_Framework#Spring_Boot)<br>
* [MySQL](https://www.mysql.com/)</br>
* [Git](https://git-scm.com/)</br>
* [Eclipse](https://www.eclipse.org/ide/)</br>

## REST Endpoints

| Return Type   | Route                           | Functionality              |
|:--------------|:--------------------------------|----------------------------|
|`List<Site>`   | `GET api/sites`                 | Retrieves all sites        |
|`List<Site>`   | `GET api/sites/search/{keyword}`| Retrieves sites by keyword |
|`Site`         | `POST api/sites`                | Creates a new site         |
|`Site`         | `PUT api/sites`                 | Updates a site             |
|`void`         | `DELETE api/sites/{id}`         | Deletes a site             |

## TODO
- [ ] Update Readme after completing frontend(Technologies used, how to run)
- [ ] Add more sites to database.

## Acknowledgements
* A special thank you to [Skill Distillery](https://www.skilldistillery.com/) instructors and 29th cohort for their help with the project.<br>
* This application uses data from the [jdm](https://github.com/jdm-contrib/jdm) project under MIT License.

