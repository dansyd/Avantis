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

Project.destroy_all
p1 = Project.create :name => 'Avantis', :desc => 'Simple project management webapp loosely based on the scrum agile model', :sprint => '2017-03-23'

Task.destroy_all
t1 = Task.create :name => 'Test associations', :desc => 'This fucking shit doesnt work', :points => 3


# Associations

u2.tasks << t1
u2.projects << p1
p1.tasks << t1
u1.projects << p1
