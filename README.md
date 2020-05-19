<h2 align="center">Point of Sales API</h2>

[![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/azmprllynsa/Point-Of-Sales-API)
![GitHub contributors](https://img.shields.io/github/contributors/azmprllynsa/Point-Of-Sales-API)
![GitHub stars](https://img.shields.io/github/stars/azmprllynsa/Point-Of-Sales-API?style=social)
![GitHub forks](https://img.shields.io/github/forks/azmprllynsa/Point-Of-Sales-API?style=social)

<p align="center" >
  <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents

* [Prerequiste](#Prerequiste)
* [Installation](#Installation)
* [Create Environment Variable](#create-environment-variable)
* [Start Development Server](#Start-Development-Server)
* [Postman Collection](#Postman-Collection)
* [API Endpoint](#API-Endpoint)
* [About Project](#About-Project)
* [Related Project](#Related-Project)
* [Contributing](#Contributing)
* [Contact](#Contact)

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/)
- Redis - Download and Install [Redis](https://redis.io/)


## Installation
### Clone
```
$ git clone https://github.com/azmprllynsa/Point-Of-Sales-API.git
$ cd api-library
$ npm install
```

## Create Environment Variable

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_TABLE_NAME
PORT=YOUR_PORT
PORT_REDIS = YOUR_REDIS_PORT // default=6879
SECRET_KEY = YOUR_SECRET_KEY
URL_EMAIL_CONFIRM = YOUR_EMAIL_VALIDATION_PAGE_FRONTEND
EMAIL = YOUR_EMAIL_CONFIRMATION
PASSWORD = YOUR_EMAIL_PASSWORD
```

## Start Development Server
```
$ npm start
```

## Postman Collection
[Click Here](https://www.getpostman.com/collections/fc001183ae45c207af2a)


## API Endpoint
### User Endpoint
| No  | HTTP Method | URI                                 | Operation                                  |
| --- | ----------- | ----------------------------------- | ------------------------------------------ |
| 1   | GET         | /api/v1/user/                       | Get all users data                         |
| 2   | GET         | /api/v1/user/:user_id               | Get user’s data by it’s ID                 |
| 3   | POST        | /api/v1/user/register               | Register new user                          |
| 4   | POST        | /api/v1/user/login                  | Login user                                 |
| 9   | PATCH       | /api/v1/user/:user_id               | Edit or update the user’s data by it’s ID  |
| 10  | DELETE      | /api/v1/user/:user_id               | Delete the user by it’s ID                 |

### Product Endpoint
| No  | HTTP Method | URI                                  | Operation                                 |
| --- | ----------- | ------------------------------------ | ----------------------------------------- |
| 1   | GET         | /api/v1/product/                     | Get all products data                     |
| 2   | GET         | /api/v1/product/:product_id          | Get product’s data by it’s ID             |
| 3   | GET         | /api/v1/product/?page=1              | Get product’s data on the 1st page        |
| 4   | GET         | /api/v1/product/?search=product_title| Search product data by title keyword      |
| 5   | GET         | /api/v1/product/?sortBy=title        | Sort product data by the title            |
| 6   | GET         | /api/v1/product/?sortBy=genre        | Sort product data by the category         |
| 7   | POST        | /api/v1/product/admin                | Insert new product data                   |
| 8   | PATCH       | /api/v1/product/admin/:product_id    | Update the product’s data by it’s ID      |
| 9   | DELETE      | /api/v1/product/admin/:product_id    | Delete the product by it’s ID             |

### Order Endpoint
| No  | HTTP Method | URI                                 | Operation                                  |
| --- | ----------- | ----------------------------------- | ------------------------------------------ |
| 1   | GET         | /api/v1/order                       | Get all orders data                        |
| 1   | GET         | /api/v1/order/:user_id              | Get all orders data by user ID             |
| 2   | GET         | /api/v1/order/:order_id             | Get order’s data by order ID               |
| 9   | POST        | /api/v1/order/                      | Insert new order data                      |
| 9   | PATCH       | /api/v1/order/:order_id             | Edit or update the order’s data by it’s ID |
| 10  | DELETE      | /api/v1/order/:order_id             | Delete the order by it’s ID                |


## About Project
It's API made for Point of Sales Project. It's project made from Node Js and Express Js

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
[Library-Frontend](https://github.com/azmprllynsa/Library-Vuejs)


## Contact
You can contact me via:
- [Instagram](https://instagram.com/azmprllynsa)
- [Email](azmi.naisa@gmail.com)


---
Copyright © 2020 [Azmi Prilly Naisa](https://github.com/azmprllynsa/)