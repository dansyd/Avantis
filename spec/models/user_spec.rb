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

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_secure_password }
  it { should have_many :projects }
  it { should have_many :tasks }
  it { should have_and_belong_to_many :skills }

  it 'should have a valid factory' do
    user = build :user
    expect(user).to be_valid
  end

end
