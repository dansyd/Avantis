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
  has_and_belongs_to_many :working_users, -> { where master: false }, class_name: 'User'
  has_and_belongs_to_many :master, -> { where master: true }, class_name: 'User'
  has_many :tasks, dependent: :destroy
end
