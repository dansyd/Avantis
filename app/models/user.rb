# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  master          :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base

  has_many :projects
  has_many :tasks
  has_many :working_projects, through: :tasks, source: :project 
  has_and_belongs_to_many :skills

  has_secure_password
  validates :email, :presence => true, :uniqueness => true, :length => {:minimum => 5}
  validates :name, :presence => true
end
