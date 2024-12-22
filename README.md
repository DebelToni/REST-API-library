# Razrabotka-REST-API homework
### Антон Христов №4 11б
Това е домашното ми за REST-API
<br>
<br>
Реших с помоща на моя добър приятел чатБДЖ да и направя малко демо на домашното което едвам работи на express - прикачил съм снимки в [images](./images/) за showcase с postman
<br>
<br>
Това представлява структурата на endpoint-овете:<br>
Authentication<br>
POST /auth/register – Register a new user.<br>
POST /auth/login – Login an existing user.<br>
<br>
Users<br>
GET /users – Retrieve all users.<br>
GET /users/:id – Retrieve a user by ID.<br>
POST /users – Create a new user.<br>
PUT /users/:id – Update a user.<br>
DELETE /users/:id – Delete a user.<br>
GET /users/:id/profile – Get a user's profile.<br>
PUT /users/:id/profile – Update a user's profile.<br>
<br>
Books<br>
GET /books – Retrieve all books or search books.<br>
GET /books/:id – Retrieve a book by ID.<br>
POST /books – Add a new book.<br>
PUT /books/:id – Update a book.<br>
DELETE /books/:id – Delete a book.<br>
POST /books/:id/borrow – Borrow a book.<br>
POST /books/:id/return – Return a book.<br>
POST /books/:id/reserve – Reserve a book.<br>
GET /books/overdue/list – Get a list of overdue books.<br>
POST /books/barcode-scan – Add a book via barcode scan.<br>
<br>
Events<br>
GET /events – Retrieve all events.<br>
GET /events/:id – Retrieve an event by ID.<br>
POST /events – Create a new event.<br>
PUT /events/:id – Update an event.<br>
DELETE /events/:id – Delete an event.<br>
POST /events/:id/register – Register for an event.<br>
DELETE /events/:id/register – Cancel event registration.<br>
POST /events/:id/invite – Invite users to an event.<br>

