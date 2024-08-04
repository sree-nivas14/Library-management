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
1. Login page
![login_page](https://github.com/user-attachments/assets/ba4e9f19-ecf3-4eeb-8d59-c5017ff9dc2b)

2. Admin dashboard.
![admin_dashboard](https://github.com/user-attachments/assets/5bb91c5f-6606-4a3d-ab00-a06595dd35b8)

3. Manage Users - view screen.
![admin_manage_users_view](https://github.com/user-attachments/assets/9d9d7f38-7cfc-45af-b388-22cf5cc69e49)

4. Manage Users - add screen.
![admin_manage_users_add](https://github.com/user-attachments/assets/fb999698-b551-440b-9de5-e3482116abd5)

5. Manage Users - update screen.
![admin_manage_users_edit](https://github.com/user-attachments/assets/52f6acfa-1cef-4366-9269-39eee0f4b964)

6. Manage Books - view screen.
![admin_manage_books_view](https://github.com/user-attachments/assets/cf7689c3-3209-4a1e-8417-c6717ba4f4e6)

7. Manage Books - add screen.
![admin_manage_books_add](https://github.com/user-attachments/assets/7a642c80-aa0e-457b-8bc4-93169e69989e)

8. Manage Books - update screen.
![admin_manage_books_edit](https://github.com/user-attachments/assets/69943a7b-3950-48e0-bc66-f390fdf739c0)

9. Book Issue List - view screen.
![admin_issue_list_view](https://github.com/user-attachments/assets/9499b835-ec03-47bc-bc7b-d5ba94e31d25)

10. Book Issue List - Approve screen.
![admin_approve_issue_list](https://github.com/user-attachments/assets/df15771b-b901-4306-baac-3943ec812bc2)

11. Book Issue List - Reject screen.
![admin_reject_issue_list](https://github.com/user-attachments/assets/ef8963b7-7650-490f-83eb-20dfffd48373)

12. Book Issue List - Return screen.
![admin_return_issue_list](https://github.com/user-attachments/assets/626e314d-b886-4917-80bf-2aa3501b415f)

### User login:
1. User dashboard.
![user_dashboard](https://github.com/user-attachments/assets/015d1ac4-742b-4cc0-b1f8-3f648026fc34)

2. Book Request - view screen.
![user_book_request_list](https://github.com/user-attachments/assets/b0f38b1e-d8e8-4ac3-8bd4-ce440c25de75)

3. Book Issue List - view screen.
![user_issue_list](https://github.com/user-attachments/assets/7e24c44b-d4a4-4a8e-9131-87141f914843)


## Contact

For any inquiries or feedback, please contact [sreenivasj14@gmail.com](mailto:your-email@example.com).

