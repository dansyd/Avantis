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

require 'rails_helper'

RSpec.describe Project, type: :model do
  it { should belong_to :user }
  it { should have_many :tasks }

  it "should have a valid factory" do
    project = build :project
    expect(project).to be_valid
  end
end
