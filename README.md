# Event Tracker Project 

Many companies employ [dark patterns](https://www.darkpatterns.org/) to make it difficult for their users to delete their accounts and personal information from their web applications. This application helps users navigate through these patterns and allows them to easily remove their accounts from a variety of web services.

## Overview

This is a full stack JPA CRUD project that is written in Java and utilizes Sprring boot and Spring REST APIs.
The API calls are done with AJAX and dynamically displayed with Javascript.

## Technologies Used

* [Java](https://en.wikipedia.org/wiki/Java_)</br>
* [Javascript](https://www.javascript.com/)</br>
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

## Acknowledgements
* A special thank you to [Skill Distillery](https://www.skilldistillery.com/) instructors.<br>
* This application uses data from the [jdm](https://github.com/jdm-contrib/jdm) project under MIT License.

