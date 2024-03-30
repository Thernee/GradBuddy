# GradBuddy Backend service

This project helps potential graduate student in searching for various information about garduate schools in the US.

## Table of Contents

- [GradBuddy Backend service](#gradbuddy-backend-service)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)

## Project Overview

GradBuddy is a web application designed to help potential graduate students navigate schools in the United States. It provides a platform for researching and comparing graduate schools based on various criteria such as field of study, location, application requirements, and scholarships.

## Features

- Search for graduate schools based on criteria such as field of study, location, and application requirements.
- View detailed information about each school, including rankings, acceptance rates, and scholarship opportunities.
- Save favorite schools for easy access.
- Comprehensive API for programmatic access to school data.

## Getting Started

### Installation

To install GradBuddy locally, follow these steps:

1. Clone the repository:

   `git clone <https://github.com/Thernee/GradBuddy.git>`

2. Navigate to the GradBuddy directory:

   `cd GradBuddy`

3. Install dependencies:

   `npm install`

### Configuration

To configure GradBuddy, follow these steps:

1. Navigate to the GradBuddy directory:
2. Copy *.env.example* to *.env*:
3. 
    `cp .env.example .env`

4. GradBuddy requires the following environment variables to be set up in .env:
   - `HOST`: The host address of the server. Default is `localhost`.
   - `PORT`: The port number of the server. Default is `3000`.
   - `DB`: The name of the database. Default is `gradbuddy`.
   - `USER`: The user name for the database.
   - `PASSWORD`: The password for the database.
   - `NODE_ENV`: The environment in which the server is running. Default is `development`.

## Usage

To use GradBuddy, follow these steps:

1. Navigate to the GradBuddy directory:
2. Start the server:
    `npm start`

3. For detailed instructions on how to interact with the API and examples of requests and responses, please refer to the [API Documentation](#api-documentation).

## API Documentation

The API documentation can be found [here](https://thernee.github.io/GradBuddy/).

You can also view the OpenAPI specification for the API locally by running the following command in the GradBuddy directory:
    `npm run doc`
