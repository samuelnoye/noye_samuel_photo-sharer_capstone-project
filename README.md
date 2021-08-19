# noye_samuel_photo-sharer_capstone-project
Introduction
Photo sharer is a web base photo sharing platform made for avid traveler who have been travelling round the world for 10 
years now. After bringing out time to reminisce on his experience so far, he wnated a photo platform to turn his adventure into a business.


SIGN
1.To signup you must provide your :
  -Name
  -Email
  -Password 



LOGIN
The system has two users. During the login authentication the system routes the user basic on thier roles.
  1. USERS are directed to the main page(front-end).
  2. ADMINISTRATORS are directed to the admin page(back-end). 
  3. Admins also can have acces to the main page thorough the back-end page.


Functions / Features

User
1. Should be able to signup & login with an email and password. No forgot 
password, account verification, reset password feature is needed.
2. Should be able to see the pictures in grid format. And when the picture is clicked it 
should open in a more zoomed view.
3. Should be able to download pictures
4. Should be able to see up-vote and down-vote for pictures and also vote

Admin
1. Should be able to upload photos with a title and description
2. Should be able to see number of up-vote and down-vote

Stack
 1. Both Multi page & API back-end application
 2. EJS
  3. Node.js / Express Backend
  4. Postgre SQL
  5. Es5&es6 Client side JavaScript
 6.  HTML 5 & CSS 3

Important Score Metrics
1. For security sake, ensuring only file with limited mine-types can be uploaded 
using a policy (middleware)
2. Using the proper GIT commit messages
3. Validating http parameters
4. Defensive Coding
5. Putting rendered html in view folder, rather than hardcoding it in controller
6. Proper Documentation
7. Using express mini-application as much as possible
8. Separating logic into separate middleware, avoid putting too much logic together
9. Good UI / UX
10. Restful Practices
11.Using a good project folder structure
12. Putting configuration out of logic to a configuration file
13.Using ajax as much as possible to prevent too many page reload which in turn 
delivers a better UX to users

