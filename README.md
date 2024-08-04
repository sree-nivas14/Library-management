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
    cd library-management/library-management-backend
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
   #### Create a database in the MySQL server with the same name as specified in the DB_DATABASE field of the .env file.
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
### Admin Login:
1. Register or log in to the system with the following credentials for admin login (Email: superadmin@gmail.com, Password: superadmin@123).
2. Upon entering the application, it is possible to create multiple users with credentials. With those credentials, access to the user login is granted.
3. Manage books, users, and categories from the admin dashboard.
4. The admin has access to add, update, delete, and view users and books.
5. Search and filter books and users based on different criteria.
6. Only the admin can approve or reject requests made by users and must update the system once a book has been returned.

### User Login:
1. To log in as a user, you must first log in to the application with admin credentials and add user details in the 'Manage Users' menu.
2. With these credentials, users can log in to the application.
3. The user dashboard provides complete information about the logged-in user, including borrowed and overdue books.
4. Users can view books and their availability in the 'Book Request' menu and raise a request for a book to the admin.
5. Once the admin approves the request, the book is allocated to the user, and all transactions are displayed in the 'Book Issue List' menu.

## Screenshots
### Admin login:
![login_page](https://github.com/user-attachments/assets/ba4e9f19-ecf3-4eeb-8d59-c5017ff9dc2b)



## Contact

For any inquiries or feedback, please contact [sreenivasj14@gmail.com](mailto:your-email@example.com).

