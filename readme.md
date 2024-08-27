# The Coffee Lovers Membership Club

## A Prototype Authorization Concept Prototype

### Technologies Used: Node.js, Express, Passport.js, PostgreSQL

Welcome to the Coffee Lovers Message Board! An educational prototype for gaining a better understanding of user registration, authorization, and management of user data. It demonstrates the implementation of user membership statuses, authorization checks for access rights, user registration validations and sanitization best practices, and various features ranging from limited read-only access for anonymous users to full admin privileges. The project has recently migrated from MongoDB to PostgreSQL to enhance data integrity and relational database management.

### Features:

-   **User Registration**: Users can sign up for an account with a username and password.
-   **User Authentication**: Implemented using Passport.js for secure authentication.
-   **User Membership Status**: Users can have different membership statuses, such as "Guest", "Member", and "Admin".
-   **Limited Read-Only Access**: Anonymous users have limited read-only access to certain parts of the site, such as viewing messages.
-   **Message Posting**: Authenticated users can post messages on the message board.
-   **Message Deletion**: Admin users can delete any message on the message board. Members can delete their own messages.
-   **Latest Messages Preview**: The index page displays a preview of the latest messages, providing a quick overview for users.
-   **Custom Middleware**: Implemented custom middleware for authentication and authorization checks to control access to different features based on user roles.
-   **Interactive Modals**: Used JavaScript to create interactive modals for actions such as creating new messages and confirming message deletions.

### Learning Experience:

Building this project provided invaluable insights into the complexities of establishing a robust user authentication system and managing user data securely. Key learnings include:

-   **User Authentication**: Understanding the importance of secure authentication mechanisms to protect user accounts.
-   **Authorization Checks**: Implementing authorization checks to control access to different features based on user roles.
-   **Custom Middleware**: Learning how to create and implement custom middleware for handling authentication and authorization logic.
-   **Interactive UI Components**: Utilizing JavaScript to enhance user interactions with features like modals for creating new messages and confirming deletions.
-   **Database Management**: Transitioning from MongoDB to PostgreSQL for relational data management. Working with PostgreSQL to manage user data and messages efficiently.
-   **Error Handling**: Implementing error handling mechanisms to gracefully handle errors and provide informative feedback to users.

### Try It Out:

Feel free to explore the Coffee Lovers Message Board! While the project is still undergoing styling improvements, it is fully usable, providing a hands-on experience with user registration, authentication, and message posting functionalities.

[Give it a try!!](https://coffee-lovers-club-postgresql.adaptable.app/)
