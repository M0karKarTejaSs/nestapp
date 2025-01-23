Sample Payloads for Postman:
CREATE Author:

Method: POST
URL: http://localhost:8080/api/author
Body:
json
Copy
Edit
{
  "action": "CREATE",
  "authorName": "New Author",
  "biography": "This is the biography of the new author.",
  "userId": 1
}
UPDATE Author:

Method: POST
URL: http://localhost:8080/api/author
Body:
json
Copy
Edit
{
  "action": "UPDATE",
  "authorId": 1,
  "authorName": "Updated Author",
  "biography": "This is the updated biography.",
  "userId": 1
}
DELETE Author:

Method: POST
URL: http://localhost:8080/api/author
Body:
json
Copy
Edit
{
  "action": "DELETE",
  "authorId": 1
}
READ ALL Authors:

Method: POST
URL: http://localhost:8080/api/author
Body:
json
Copy
Edit
{
  "action": "READ_ALL"
}
READ ONE Author:

Method: POST
URL: http://localhost:8080/api/author
Body:
json
Copy
Edit
{
  "action": "READ_ONE",
  "authorId": 1
}



//---
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
