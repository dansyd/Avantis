# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
u1 = User.create :name => 'Daniele Peviani', :email => 'daniele.peviani@ga.co', :password => 'chicken', :password_confirmation => 'chicken', :master => true
u2 = User.create :name => 'Daniel Ting', :email => 'daniel.ting@ga.co', :password => 'chicken', :password_confirmation => 'chicken',  :master => false
u3 = User.create :name => 'Christle Lee', :email => 'clee@ga.co', :password => 'chicken', :password_confirmation => 'chicken',  :master => false

Project.destroy_all
p1 = Project.create :name => 'Avantis', :desc => 'Simple project management webapp loosely based on the scrum agile model', :sprint => '2017-03-23'
p2 = Project.create :name => 'The next big "thing"', :desc => 'The app that will revolutionise the world', :sprint => '2017-03-29'

Task.destroy_all
t1 = Task.create :name => 'Implement user avatar', :desc => 'Allow users to upload an avatar picture to their profile. Stored in cloudinary', :points => 3
t2 = Task.create :name => 'Create basic CRUD for users', :desc => 'Allow user to sign up, sign in, edit their profile and upload avatar pictures. Store session when logged in', :points => 5
t3 = Task.create :name => 'Testing', :desc => 'Extensive testing of all functionalities in dashboard', :points => 8

# Associations

u1.projects << p1 << p2
u2.projects << p1 << p2
u3.projects << p2

u2.tasks << t1
u3.tasks << t2

p1.tasks << t1
p2.tasks << t2 << t3
