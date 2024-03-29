# Account Shredder

Many companies employ [dark patterns](https://www.darkpatterns.org/) to make it difficult for their users to delete their accounts and personal information from their web applications. This application helps users navigate through these patterns and allows them to easily remove their accounts from a variety of web services.

## Overview

This is a full stack JPA CRUD project that is written in Java and utilizes Spring boot and Spring REST APIs.
The frontend is now completely rewritten in Typescript and utilizes Angular Framework.

## Technologies Used
* [Angular](https://angular.io/)</br>
* [Typescript](https://www.typescriptlang.org/)</br>
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

## Build from source
If you are familar with Spring framework and Angular, you can build the app from source and run your own instance.
To build from source, you will need to run the Spring boot backend on a tomcat server or similar. Then navigate to the ngSites directory and run the frontend using Angular CLI. Current port for Spring is 8500, and for Angular 4200, you can adjust them if you like. If you visit the Spring port from your browser, you will see the previous version of the app which has a pure Javascript frontend. If you visit the Angular port you will experience the new frontend written from scratch in Typescript.

## Acknowledgements
* A special thank you to [Skill Distillery](https://www.skilldistillery.com/) instructors.<br>
* This application uses data from the [jdm](https://github.com/jdm-contrib/jdm) project under MIT License.

