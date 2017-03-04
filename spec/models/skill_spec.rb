# == Schema Information
#
# Table name: skills
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Skill, type: :model do
  it { should have_and_belong_to_many :users }

  it 'should have a valid factory' do
    skill = build :skill
    expect(skill).to be_valid
  end

end
