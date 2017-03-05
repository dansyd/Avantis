FactoryGirl.define do
  factory :skill do
    name ["Front end", "Javascript", "Rails", "Database", "Responsive", "Node.js"].sample
  end

  factory :task do
    name "Test all the association"
    desc "Run rspec to check if all the associations are working"
    points 3
  end

  factory :user do |f|
    f.sequence(:name) { Faker::Name.name }
    f.sequence(:email) { Faker::Internet.email }
    password_digest "chicken"
    master false
  end

  factory :project do
    name "Avantis"
    desc "Simple app for Agile scrum tracking"
    sprint { Faker::Date.between(2.weeks.from_now, 4.weeks.from_now) }
  end

end
