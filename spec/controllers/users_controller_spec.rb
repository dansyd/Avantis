require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe 'GET to user signup' do

      describe 'as HTML' do
        before do
          get :new
        end

        it 'Should respond with a status 200' do
          expect(response).to be_success
          expect(response.status).to eq 200
        end



        it 'should render the new view' do
          expect(response).to render_template('new')
        end

      end
    end

    # describe 'POST to create' do
    #   describe 'A fruit with valid info' do
    #     before do
    #       post :create, { :fruit => { :name => 'Strawberry' }}
    #     end
    #
    #     it 'Should redirect to the show action' do
    #       expect(response).to redirect_to(assigns(:fruit))
    #     end
    #
    #     it 'Should increase the number of fruit' do
    #       expect(Fruit.count).to eq 1
    #     end
    #
    #   end
    #
    #   describe 'A fruit with invalid info' do
    #     before do
    #       post :create, { :fruit => { :name => '' }}
    #     end
    #
    #     it 'Should render new template' do
    #       expect(response).to render_template(:new)
    #     end
    #
    #     it 'Should not increase the number of fruit' do
    #       expect(Fruit.count).to eq 0
    #     end
    #
    #   end
    #
    # end

end
