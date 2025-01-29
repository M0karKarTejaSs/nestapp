# Getting Started with Create React App

STRUCT

/src
  /api          # For API-related files (e.g., Axios or fetch configurations)
  /assets       # For static files like images, fonts, etc.
  /components   # Reusable components
    /Auth       # Components for SignIn/SignUp
    /Common     # Shared components like Buttons, Modals, Inputs, etc.
  /context      # Context API files for global state management
  /hooks        # Custom hooks (e.g., useAuth, useRealTimeUpdates)
  /pages        # Pages of your application
    /Home       # Home page and related files
    /Dashboard  # Dashboard page and related files
  /services     # Service files for managing WebSocket or API calls
  /styles       # Global and component-specific styles (e.g., CSS or SCSS files)
  /utils        # Utility functions like date formatting, validation, etc.
  /config       # Configuration files (e.g., environment variables, constants)
  /App.js       # Main App component
  /index.js     # Entry point of the application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

duplicacy check in insert category

while update dont check self duplicacy

dynamic table
tried dynamic crud fetch
dynamic post options
on page manual refresh ask user changes not saved do u want to refresh 


-------------------------------------------------------------------------------


branding 
profile
dynamic url
loadDataInfile
chunk wise
captcha
change password
forgot password virtual host








Sure! Here's a basic outline and documentation for your **Book Inventory Management System** project, which can be customized further as your project evolves.

---

# **Book Inventory Management System Documentation**

## **Project Overview**
The **Book Inventory Management System** (BIMS) is designed to manage book records in a bookstore or library system. The system allows users to perform operations such as adding, updating, deleting, and viewing books, authors, and genres. It also integrates features like user authentication, session management, and a responsive front-end interface using React.

---

## **Technology Stack**
- **Backend**: Java Spring Boot, JPA (Java Persistence API), MySQL (or any other relational database)
- **Frontend**: React.js, HTML, CSS
- **Authentication**: JWT (JSON Web Tokens)
- **APIs**: RESTful APIs for data exchange
- **Libraries & Tools**:
  - React Toastify for notifications
  - JWT decode for decoding tokens
  - Axios or Fetch API for HTTP requests

---

## **Features**
1. **Book Management**: CRUD operations for book records.
2. **Author Management**: CRUD operations for authors.
3. **Genre Management**: CRUD operations for genres.
4. **User Authentication**: Login and session management using JWT.
5. **Search and Filtering**: Allows searching and filtering of books, authors, and genres.
6. **Responsive Interface**: Mobile-friendly and optimized for various screen sizes.

---

## **Backend: API Endpoints**

### **1. Book Management API**
- **Get all books**: `GET /api/book`
- **Create new book**: `POST /api/book`
- **Update book**: `PUT /api/book`
- **Delete book**: `DELETE /api/book`

#### Example:
```java
@RestController
@RequestMapping("/api/book")
public class BookController {
    
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks(@RequestParam Long userId) {
        return bookService.getAllBooks(userId);
    }

    @PostMapping
    public Book saveBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PutMapping
    public Book updateBook(@RequestBody Book book) {
        return bookService.updateBook(book);
    }

    @DeleteMapping
    public void deleteBook(@RequestParam Long bookId) {
        bookService.deleteBook(bookId);
    }
}
```

### **2. Author Management API**
- **Get all authors**: `GET /api/author`
- **Create new author**: `POST /api/author`
- **Update author**: `PUT /api/author`
- **Delete author**: `DELETE /api/author`

#### Example:
```java
@RestController
@RequestMapping("/api/author")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    @PostMapping
    public Author saveAuthor(@RequestBody Author author) {
        return authorService.saveAuthor(author);
    }

    @PutMapping
    public Author updateAuthor(@RequestBody Author author) {
        return authorService.updateAuthor(author);
    }

    @DeleteMapping
    public void deleteAuthor(@RequestParam Long authorId) {
        authorService.deleteAuthor(authorId);
    }
}
```

### **3. Genre Management API**
- **Get all genres**: `GET /api/genre`
- **Create new genre**: `POST /api/genre`
- **Update genre**: `PUT /api/genre`
- **Delete genre**: `DELETE /api/genre`

#### Example:
```java
@RestController
@RequestMapping("/api/genre")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }

    @PostMapping
    public Genre saveGenre(@RequestBody Genre genre) {
        return genreService.saveGenre(genre);
    }

    @PutMapping
    public Genre updateGenre(@RequestBody Genre genre) {
        return genreService.updateGenre(genre);
    }

    @DeleteMapping
    public void deleteGenre(@RequestParam Long genreId) {
        genreService.deleteGenre(genreId);
    }
}
```

### **4. User Authentication API**
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`

#### Example:
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        authenticationService.logout();
        return ResponseEntity.ok("Logged out successfully.");
    }
}
```

---

## **Frontend: React Components**

### **1. Book List Component**
Displays a list of books in a table format. Each book can be edited or deleted.

```jsx
const BookList = ({ books, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.bookId}>
                        <td>{book.title}</td>
                        <td>{book.authorName}</td>
                        <td>{book.genreName}</td>
                        <td>
                            <button onClick={() => onEdit(book)}>Edit</button>
                            <button onClick={() => onDelete(book.bookId)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
```

### **2. Book Form Component**
Handles the book form for adding or editing book details.

```jsx
const BookForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                type="text"
                name="author"
                value={formData.author || ''}
                onChange={handleChange}
                placeholder="Author"
                required
            />
            <input
                type="text"
                name="genre"
                value={formData.genre || ''}
                onChange={handleChange}
                placeholder="Genre"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};
```

### **3. Author and Genre Dropdowns**
```jsx
const Dropdown = ({ options, selectedValue, onChange, label }) => {
    return (
        <div>
            <label>{label}</label>
            <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
```

---

## **Database Schema**

### **1. Book Table**
| Column Name     | Data Type         | Description                        |
|-----------------|-------------------|------------------------------------|
| bookId          | INT (PK)          | Unique identifier for the book    |
| title           | VARCHAR           | Title of the book                 |
| isbn            | VARCHAR(13)       | ISBN number of the book           |
| authorId        | INT (FK)          | Reference to the author           |
| genreId         | INT (FK)          | Reference to the genre            |
| price           | DECIMAL(10,2)     | Price of the book                 |
| quantity        | INT               | Quantity of the book in stock     |
| description     | TEXT              | Description of the book           |
| publisher       | VARCHAR           | Publisher of the book             |
| publicationDate | DATE              | Date when the book was published  |
| rating          | DECIMAL(2,1)      | Rating of the book (0-5)          |

### **2. Author Table**
| Column Name     | Data Type         | Description                        |
|-----------------|-------------------|------------------------------------|
| authorId        | INT (PK)          | Unique identifier for the author  |
| authorName      | VARCHAR           | Name of the author                |

### **3. Genre Table**
| Column Name     | Data Type         | Description                        |
|-----------------|-------------------|------------------------------------|
| genreId         | INT (PK)          | Unique identifier for the genre   |
| genreName       | VARCHAR           | Name of the genre                 |

---

## **Conclusion**

This Book Inventory Management System enables users to easily manage books, authors, and genres, and provides functionalities like adding, updating, deleting, and viewing records. It also supports user authentication and a responsive frontend. The backend is built using Spring Boot, with API endpoints to interact with the frontend and a relational database for storing records.

----
----

Spring Boot – Sending Email via SMTP
Last Updated : 04 Jan, 2025
Spring Boot provides the ability to send emails via SMTP using the JavaMail Library. Here we will be illustrating step-by-step guidelines to develop Restful web services that can be used to send emails with or without attachments. In order to begin with the steps, let us first create a Spring Boot project using Spring Initializer.

Implementation:

Step 1: Adding the spring-boot-starter-mail dependency in pom.xml.


<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
This dependency is a starter for using JavaMail and can be considered as Spring Framework’s email sending support

Step 2: Setting up Application.properties file with configurations required for using Gmail SMTP server.

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=<Login User to SMTP server>
spring.mail.password=<Login password to SMTP server>
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
The Gmail Id used to login into your Gmail account can be provided as the username. For password generation, 2-step verification needs to be enabled for your account as follows:



Following that, AppPassword needs to be created using the following path:

Login to Gmail 
    -> Manage your Google Account 
        -> Security 
            -> App Passwords 
                -> Provide your login password 
                    -> Select app with a custom name 
                        -> Click on Generate


Note: For reference,


If you don’t find the App Password option under Security even after enabling 2-step verification, you might be encountering an issue detailed in this Google Support Thread on App Passwords.


To generate an App Password, visit the Google App Passwords page. This page will guide you through the process of creating an App Password for your Gmail account.


Step 3: Creating EmailDetails class that contains fields such as recipient, msgBody, subject, and attachment.


// Java Program to Illustrate EmailDetails Class

package com.SpringBootEmail.Entity;

// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

// Class
public class EmailDetails {

    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
Step 4: Creating interface EmailService and implementing class EmailServiceImpl of service layer.

The EmailService interface defines two methods:

String sendSimpleMail(EmailDetails details): This method can be used to send a simple text email to the desired recipient.
String sendMailWithAttachment(EmailDetails details): This method can be used to send an email along with an attachment to the desired recipient.
The Interface and service implementation class is as shown below in example as follows: 

File: EmailService.java

// Java Program to Illustrate Creation Of
// Service Interface

package com.SpringBootEmail.service;

// Importing required classes
import com.SpringBootEmail.Entity.EmailDetails;

// Interface
public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details);
}
JavaMailSender interface of JavaMail API is used here to send simple text email. 

To send a more sophisticated email with an attachment, MimeMessage can be used. MimeMessageHelper works as a helper class for MimeMessage to add the attachment and other details required to send the mail.

File: EmailServiceImpl.java

// Java Program to Illustrate Creation Of
// Service implementation class

package com.SpringBootEmail.service;

// Importing required classes
import com.SpringBootEmail.Entity.EmailDetails;
import java.io.File;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

// Annotation
@Service
// Class
// Implementing EmailService interface
public class EmailServiceImpl implements EmailService {

    @Autowired private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    // Method 1
    // To send a simple email
    public String sendSimpleMail(EmailDetails details)
    {

        // Try block to check for exceptions
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage
                = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    // Method 2
    // To send an email with attachment
    public String
    sendMailWithAttachment(EmailDetails details)
    {
        // Creating a mime message
        MimeMessage mimeMessage
            = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                details.getSubject());

            // Adding the attachment
            FileSystemResource file
                = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }
}
Step 5: Creating a Rest Controller EmailController which defines various API for sending email.


// Java Program to Create Rest Controller that
// Defines various API for Sending Mail

package com.SpringBootEmail.controller;

// Importing required classes
import com.SpringBootEmail.Entity.EmailDetails;
import com.SpringBootEmail.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Annotation
@RestController
// Class
public class EmailController {

    @Autowired private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status
            = emailService.sendSimpleMail(details);

        return status;
    }

    // Sending email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
        @RequestBody EmailDetails details)
    {
        String status
            = emailService.sendMailWithAttachment(details);

        return status;
    }
}
Step 6: Running the Spring Boot Application and hitting http://localhost:8080/sendMail to send a simple email



Mail received on Gmail is as follows:



Step 7: Running the Spring Boot Application and hitting http://localhost:8080/sendMailWithAttachment to send an email along with an attachment.



Mail received on Gmail is as follows:


