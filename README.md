# Library Management System

## Overview

This project is a comprehensive Library Management System built using React for the frontend and Laravel for the backend. The system allows users to manage library resources, track borrowing activities, and maintain an organized record of books.

## Features

- User authentication and authorization using Laravel Passport
- CRUD operations for books, authors, and categories
- Borrowing and returning books functionality
- Search and filter books
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, Axios, Bootstrap
- **Backend**: Laravel, MySQL
- **Authentication**: Laravel Passport

## Installation

### Prerequisites

- Node.js
- npm or yarn
- PHP
- Composer
- MySQL

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/sree-nivas14/Library-management.git
    cd library-management-system/library-management-backend
    ```

2. Install dependencies:
    ```sh
    composer install
    ```

3. Copy the `.env.example` file to `.env` and configure your database settings:
    ```sh
    cp .env.example .env
    ```

4. Generate an application key:
    ```sh
    php artisan key:generate
    ```

5. Run the migrations:
   #### Create database name 'library_management_zoho' in MySql server 
   ```sh
    php artisan migrate
    ```
   
6. Run the seeders:
   ```sh
    php artisan db:seed --class=UserSeeder
    ```
   
7. Install Laravel Passport:
    ```sh
    php artisan passport:install
    ```

8. Start the development server:
    ```sh
    php artisan serve
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../library-management-frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

1. Register or log in to the system.
2. Manage books, authors, and categories from the admin dashboard.
3. Borrow and return books.
4. Search and filter books based on different criteria.


## Contact

For any inquiries or feedback, please contact [sreenivasj14@gmail.com](mailto:your-email@example.com).

