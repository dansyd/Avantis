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
  belongs_to :user
  has_many :tasks
end
