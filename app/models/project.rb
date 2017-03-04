# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  sprint      :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#

class Project < ActiveRecord::Base
  has_many :working_users, through: :tasks, source: :user
  belongs_to :master, class_name: :User, foreign_key: 'user_id' 
  has_many :tasks
end
