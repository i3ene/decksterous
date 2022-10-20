# Software Requirements Specification

## Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#1-introduction)
    - [Purpose](#11-purpose)
    - [Scope](#12-scope)
    - [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [References](#14-references)
    - [Overview](#15-overview)
- [Overall Description](#2-overall-description)
    - [Vision](#21-vision)
    - [Use Case Diagram](#22-use-case-diagram)
    - [Technology Stack](#23-technology-stack)
- [Specific Requirements](#3-specific-requirements)
    - [Functionality](#31-functionality)
    - [Usability](#32-usability)
    - [Reliability](#33-reliability)
    - [Supportability](#35-supportability)
    - [Design Constraints](#36-design-constraints)
    - [Online User Documentation and Help System Requirements](#37-on-line-user-documentation-and-help-system-requirements)
    - [Interfaces](#39-interfaces)
    - [Licensing Requirements](#310-licensing-requirements)
    - [Legal, Copyright And Other Notices](#311-legal-copyright-and-other-notices)
    - [Applicable Standards](#312-applicable-standards)
- [Supporting Information](#4-supporting-information)

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) describes all specifications for the application "Decksterous". It
includes an overview about this project and its vision, detailed information about the planned features and boundary
conditions of the development process.

### 1.2 Scope

The game is going to be realized as a Webapplication.

Planned Subsystems are:

//TODO

* Notice Board:  
  The notice board is the essential part of the user interface. Game sessions should be visualized as postings including
  relevant information about the session. Those should be partly standardized by a form with a free text option for
  specifics. The data must be stored accordingly.
* Account System:  
  Users can create accounts so sessions can be connected to a person as well as to join requests. User data must be
  stored alongside the posting data.
* Friend List and User Rating:  
  Once the account system is created there will be the option to mark users as favorites. Also users or game sessions
  should get a rating to counter abuse.
* Connecting People:  
  The host of a game session has to be notified when someone wants to join their game. Both must then be able to get in
  touch to organize the details, so messages between the host and the guest have to be enabled. This could be done via
  automated emails or a custom in-app system. For this an account system is needed.
* Storing Data:  
  User data for accounts and possibly profiles has to be stored. Also the game sessions have to be stored as datasets
  containing the form contents and possibly contact data. The data storage will form the foundation for the
  visualization, account system and the search feature.
* Finding your Game:  
  We need a tag system so everyone looking to join a game can search for the kind of games they are interested in.
  Possibly other aspects can be searchable, such as place or date. Tags must be stored and a search function developed.

### 1.3 Definitions, Acronyms and Abbreviations

| Abbrevation | Explanation                            |
| ----------- | -------------------------------------- |
| SRS         | Software Requirements Specification    |
| UC          | Use Case                               |
| n/a         | not applicable                         |
| tbd         | to be determined                       |
| UCD         | overall Use Case Diagram               |
| FAQ         | Frequently asked Questions             |

### 1.4 References

| Title                                                              | Date       | Publishing organization   |
| -------------------------------------------------------------------|:----------:| ------------------------- |
| [Common Playground Blog](http://commonplayground.wordpress.com)    | 18.10.2018 | Common Playground Team    |
| [GitHub](https://github.com/nilskre/CommonPlayground)              | 18.10.2018 | Common Playground Team    |

### 1.5 Overview

The following chapter provides an overview of this project with vision and Overall Use Case Diagram. The third chapter (
Requirements Specification) delivers more details about the specific requirements in terms of functionality, usability
and design parameters. Finally there is a chapter with supporting information.

## 2. Overall Description

### 2.1 Vision

Our idea is to make a battle and collection card game with fully customisable rules. Players will able to challenge
others and compete against them in different game modes. Before a battle, players can pick their cards for their deck to
play with. Each game can have different rules that are even customisable by players themself. In certain modes it is
even possible to lose cards permanently, so choose wisely with what cards you want to play with! There will also be an
option to upgrade your cards.

### 2.2 Use Case Diagram


//TODO ?

### 2.3 Technology Stack

The technology we use is:

Backend:
-Node.js which will be powered by Express.js for web capability and Socket.io for WebSocket handling

Frontend:
-TypeScript with the Angular and Material frameworks.

IDE:
-IntelliJ and Visual Studio Code

Project Management:
-YouTrack -GitHub -Discord

Deployment:
-not sure yet

## 3. Specific Requirements

### 3.1 Functionality

This section will explain the different use cases, you could see in the Use Case Diagram, and their functionality.  
Until December we plan to implement:

- 3.1.1 Picking cards for your deck
- 3.1.2 Challenging other players
- 3.1.3 Competing in tournaments
- 3.1.4 Levelling up
- 3.1.5 Unlocking achievements

#### 3.1.1 Picking cards for your deck

This feature is the essential one of our project. The user gets the possibility to post a session. Therefore, they have
to select a game and also set the time when they want to play.For offline games, they have to set a location, too. For
online games the location can be a server for example or simply be tagged as 'online'.


#### 3.1.2 Challenging other players

This feature provides a basic overview over all current sessions. All posted sessions are added here. From this overview
you can select a session and from there join this session.


#### 3.1.3 Competing in tournaments

To identify all useres we need an account system. This account system enables us to build important functions such as
joining a session, leaving a session or a personalized overview over all sessions (Keeping track of your sessions).


#### 3.1.4 Levelling up

The app will provide the possibility to register and log in. This will also make the usability easier when a user wants
to manage his sessions, post or join a session because they don't have to enter their mail address every time.


#### 3.1.5 Unlocking achievements

In case you share your phone, have multiple accounts or just want to be cautius about your privacy you should be able to
manually log out.


### 3.2 Usability

We plan on designing the user interface as intuitive and self-explanatory as possible to make the user feel as
comfortable as possible using the game. Another big point is the fun factor, which should be always given.

#### 3.2.1 No training time needed

Our goal is that a user installs the android application, opens it and is able to use all features without any
explanation or help.

#### 3.2.2 Familiar Feeling

We want to implement a webapp with familiar designs and functions. This way users are able to interact in familiar ways
with the application without having to learn new interfaces. The plan is to make everything as easy as possible for the
players.

### 3.3 Reliability

#### 3.3.1 Availability

The server shall be available 95% of the time. This also means we have to figure out the "rush hours" of our app because
the downtime of the server is only tolerable when as few as possible players want to use the app.

#### 3.3.2 Defect Rate

Our goal is that we have no loss of any data. This is important so that the game sessions can carry on, even after a
downtime of the server.

### 3.4 Perfomance

#### 3.4.1 Capacity

The system should be able to manage thousands of requests. It should be possible to register as many users as necessary
as well.

#### 3.4.3 App perfomance / Response time

To provide the best App perfomance we aim to keep the response time as low as possible. This will make the user
experience much better. This is given because we only put out requests if we really need a component, so nothing gets
loaded unnecessarily.

### 3.5 Supportability

#### 3.5.1 Coding Standards

We are going to write the code by using all of the most common clean code standards. For example we will name our
variables and methods by their functionalities. This will keep the code easy to read by everyone and make further
developement much easier. Our code formatting is going to be handled by 'Prettier', which is a code formatter that
allows all developers to have the same code formatting.

#### 3.5.2 Testing Strategy

The application will have a high test coverage and all important functionalities and edge cases should be tested.
Further mistakes in the implementation will be discovered instantly and it will be easy to locate the error.

### 3.6 Design Constraints

We are trying to provide a modern and easy to handle design for the UI aswell as for the architecture of our
application. To achieve that the functionalities will be kept as modular as possible.

### 3.7 On-line User Documentation and Help System Requirements

The usage of the app should be as intuitive as possible so it won't need any further documentation. If the user needs
some help we will implement a "Help"-Button in the App which includes a FAQ and a formular to contact the developement
team.

### 3.8 Purchased Components

We don't have any purchased components yet. If there will be purchased components in the future we will list them here (
e.g Card packs).

### 3.9 Interfaces

#### 3.9.1 User Interfaces

The User interfaces that will be implented are:

//TODO

#### 3.9.4 Communication Interfaces

The server and hardware will communicate using the http protocol.

### 3.10 Licensing Requirements

### 3.11 Legal, Copyright, and Other Notices
//TODO

### 3.12 Applicable Standards

The development will follow the common clean code standards and naming conventions. Also we will create a definition of
d which will be added here as soon as its complete.

## 4. Supporting Information
 The Team Members are:

- Mats Fischer
- Benedikt Müll
- Oliver Saar