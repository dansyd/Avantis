require 'rails_helper'

RSpec.describe Skill, type: :model do
  it { should have_and_belong_to_many :users }

  it 'should have a valid factory' do
    skill = build :skill
    expect(skill).to be_valid
  end

end
