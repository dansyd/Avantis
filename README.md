![logo](http://res.cloudinary.com/dt9ppmca8/image/upload/v1489109746/avantis-logo_or6usj.jpg)

## About

Welcome to Avantis!
Avantis is a project management tool based on the scrum agile methodology. The idea is for a "scrum master" to be able to create new projects and assign team members to it. Members are then able to sign in and take available tasks. It is meant to be an easy to use and simple way to keep track of ongoing projects.

[Live Demo](https://avantis-app.herokuapp.com/)

## Instruction

To test the app, please create an account by filling up the form in the signup page.
At this point you don't have access to any projects in your dashboard.
You can log in as the admin(master) with these credential:
email: admin@admin.com
password: admin
Go to the dashboard and add yourself to a project. You can then log back in with the account you originally created. You are now able to see the project you assigned yourself to and take available tasks.

## Features

* User Signin and Signup
* Admin(master) Dashboard with ability to create/manage projects and tasks
* Ability to assign team members to projects
* Team members can take available tasks
* Team members release taken tasks or mark them as completed
* Admin(master) is able to reopen a task if marked as completed  

## Built With

**Web application framework**

* Rails 4.2.7.1
* Ruby 2.2.6

**Libraries, plugins and technologies used**

* jQuery
* AJAX
* Flexbox layout
* Mobile first development
* SASS
* Progressbar.js
* Cloudinary for avatar pictures storage

**GEMS**

* Rails 12 Factor (Heroku deployment)
* Bcrypt (authentication)
* Factory_girl_rails
* Faker
* Cloudinary
* Autoprefixer-rails
* Rspec-rails
* Shoulda-matchers

## Known Issues, Bugs and improvements

* The edit of the sprint date reset the sprint, regardless of when it was created.
* Allow admin to remove team members assigned to a project
* Implement Teams (allow to create a new admin account and send invitation to team members to sign up)
* Add progress bars to keep track of sprint and points(tasks completed) progress
* Reset sprint(project) after completed
