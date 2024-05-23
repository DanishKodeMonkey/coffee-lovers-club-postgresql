# The Coffee Lovers Membership Club

## A Prototype Authorization Concept Prototype

### Technologies Used: Node.js, Express, Passport.js, MongoDB

Welcome to the Coffee Lovers Message Board! An educational prototype for gaining better understanding of user registration, authorization, and management of user data. It demonstrates the implementation of user membership statuses, authorization checks for access rights, user registration validations and sanitization best practices, and various features ranging from limited read-only access for anonymous users to full admin privileges. As well as various methods and usages of mongoose to pull, create and delete messages stored on the database.

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
-   **Database Management**: Working with MongoDB to store user data and messages efficiently.
-   **Error Handling**: Implementing error handling mechanisms to gracefully handle errors and provide informative feedback to users.

### Work in Progress:

While the project is feature complete and fully functional, I am still working on the styling of the different components, which means that for now the styling is quite bare bones.

### Try It Out:

Feel free to explore the Coffee Lovers Message Board! While the project is still undergoing styling improvements, it is fully usable, providing a hands-on experience with user registration, authentication, and message posting functionalities.

Give it a try!!
