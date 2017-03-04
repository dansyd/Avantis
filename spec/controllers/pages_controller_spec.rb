require 'rails_helper'

RSpec.describe PagesController, type: :controller do

  describe 'GET to index' do

    describe 'as HTML' do
      before do
        get :index
      end

      it 'Should respond with a status 200' do
        expect(response).to be_success
        expect(response.status).to eq 200
      end

      it 'should render the index view' do
        expect(response).to render_template('index')
      end

    end

  end

end
