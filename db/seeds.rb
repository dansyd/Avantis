# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
u1 = User.create :name => 'Joe Black', :avatar => 'avantis-app/47.jpg', :email => 'admin@admin.com', :password => 'admin', :password_confirmation => 'admin', :master => true
u2 = User.create :name => 'Luis Long', :avatar => 'avantis-app/57.jpg', :email => 'luis.long17@example.com', :password => 'chicken', :password_confirmation => 'chicken', :master => false
u3 = User.create :name => 'Rodney Bailey', :avatar => 'avantis-app/3.jpg', :email => 'rodney.bailey78@example.com', :password => 'chicken', :password_confirmation => 'chicken', :master => false
u4 = User.create :name => 'Marsha Watts', :avatar => 'avantis-app/49.jpg', :email => 'marsha.watts79@example.com', :password => 'chicken', :password_confirmation => 'chicken', :master => false
u5 = User.create :name => 'Johnni Mckinney', :avatar => 'avantis-app/84.jpg', :email => 'johnni.mckinney14@example.com', :password => 'chicken', :password_confirmation => 'chicken', :master => false
u6 = User.create :name => 'Riley Woods', :avatar => 'avantis-app/44.jpg', :email => 'riley.woods65@example.com', :password => 'chicken', :password_confirmation => 'chicken', :master => false
u7 = User.create :name => 'Sonia Lynch', :avatar => 'avantis-app/65.jpg', :email => 'sonia.lynch32@example.com', :password => 'chicken', :password_confirmation => 'chicken', :master => false



# u2 = User.create :name => 'Daniel Ting', :email => 'daniel.ting@ga.co', :password => 'chicken', :password_confirmation => 'chicken',  :master => false
# u3 = User.create :name => 'Christle Lee', :email => 'clee@ga.co', :password => 'chicken', :password_confirmation => 'chicken',  :master => false

Project.destroy_all
p1 = Project.create :name => 'Screener', :desc => 'Simple app to create screenshots of websites and save them to an online account', :sprint => '2017-03-23'
p2 = Project.create :name => 'The next big "thing"', :desc => 'The app that will revolutionise the world', :sprint => '2017-03-29'

Task.destroy_all
t1 = Task.create :name => 'Implement user avatar', :desc => 'Allow users to upload an avatar picture to their profile. Stored in cloudinary', :points => 3
t2 = Task.create :name => 'Create basic CRUD for users', :desc => 'Allow user to sign up, sign in, edit their profile and upload avatar pictures. Store session when logged in', :points => 5
t3 = Task.create :name => 'Work with screenshot API', :desc => 'Implement screenshotlayer api to create the screenshot of a given url', :points => 8
t4 = Task.create :name => 'Save screenshots', :desc => 'Allow users to save the screenshots they take to cloudinary and their virtual space', :points => 5
t5 = Task.create :name => 'Folder system', :desc => 'Allow user to organise their screenshots into folders and subfolders', :points => 8
t6 = Task.create :name => 'Basic CRUD for screenshots', :desc => 'Implement basic CRUD functionalities for screenshots', :points => 3
t7 = Task.create :name => 'Testing', :desc => 'Extensive testing of all functionalities in dashboard', :points => 8

# Associations

u1.projects << p1 << p2
u2.projects << p1 << p2
u3.projects << p2
u4.projects << p1 << p2
u5.projects << p2
u6.projects << p1 << p2
u7.projects << p2

u2.tasks << t1
u3.tasks << t2
u4.tasks << t3
u5.tasks << t4

p1.tasks << t1 << t3 << t4 << t5 << t6 << t7
p2.tasks << t2
