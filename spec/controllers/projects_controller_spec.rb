require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do

  describe "GET to index" do
    before do
      project = create :project
      get :index
    end

    it 'Should respond with a status 200' do
      expect(response).to be_success
      expect(response.status).to eq 200
    end

    it 'should render the index view' do
      expect(response).to render_template('index')
    end

    # context 'when master is logged in' do
    #   before do
    #     user = FactoryGirl.create(:user, :master => true)
    #     project = FactoryGirl.create :project
    #     user.projects << project
    #     stub(controller).current_user { user }
    #   end
    #
    #   it 'should disply the master projects' do
    #     expect(assigns(:projects)).not_to be_nil
    #   end
    # end


  end


  # describe "GET #create" do
  #   it "returns http success" do
  #     get :create
  #     expect(response).to have_http_status(:success)
  #   end
  # end
  #
  # describe "GET #destroy" do
  #   it "returns http success" do
  #     get :destroy
  #     expect(response).to have_http_status(:success)
  #   end
  # end
end
