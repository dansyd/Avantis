# == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  name       :string
#  desc       :text
#  points     :integer
#  project_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

require 'rails_helper'

RSpec.describe Task, type: :model do
  it { should belong_to :project }
  it { should belong_to :user }

  it 'should have a valid factory' do
    task = build :task
    expect(task).to be_valid
  end
end
