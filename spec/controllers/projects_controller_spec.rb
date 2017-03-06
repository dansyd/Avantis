require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do

  describe "GET to index" do
    before do
      user = create(:user, :master => true)
      project = create :project
      user.projects << project
      get :index, nil, {user_id: user.id}  # get url, params, session
    end

    it 'Should respond with a status 200' do
      expect(response).to be_success
      expect(response.status).to eq 200
    end

    it 'should render the index view' do
      expect(response).to render_template('index')
    end

    it 'should display the master projects' do
      expect(assigns(:projects)).not_to be_nil
    end

  end

end
