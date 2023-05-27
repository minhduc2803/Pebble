require 'rails_helper'

RSpec.describe UsersController, type: :request do
  describe 'POST /users' do
    context 'when valid user parameters are provided' do
      let(:headers) {{ 'Content-Type' => 'application/json' }}
      let(:valid_user_params) do
        {
          user: {
            full_name: 'John Doe',
            email: 'john@example.com',
            password: 'password'
          }
        }
      end

      it 'creates a new user' do
        expect do
          post '/users', params: valid_user_params.to_json, headers: headers
        end.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response_body['id']).to be_present
        expect(response_body['full_name']).to eq('John Doe')
        expect(response_body['email']).to eq('john@example.com')
        expect(response_body['token']).to be_present
      end
    end

    context 'when invalid user parameters are provided' do
      let(:headers) {{ 'Content-Type' => 'application/json' }}
      let(:invalid_user_params) do
        {
          user: {
            full_name: '',
            email: 'invalid_email',
            password: 'short'
          }
        }
      end

      it 'returns errors' do
        post '/users', params: invalid_user_params.to_json, headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response_body['errors']).to include("Full name can't be blank")
        expect(response_body['errors']).to include('Email is invalid')
        expect(response_body['errors']).to include('Password is too short (minimum is 8 characters)')
      end
    end
  end

  describe 'GET /users/user_info' do
    context 'when authenticated' do
      let(:user) { create(:user) }
      let(:auth_token) { Knock::AuthToken.new(payload: { sub: user.id }).token }
      let(:headers) { { 'Authorization' => "Bearer #{auth_token}" } }

      it 'returns user information' do
        get '/users/user_info', headers: headers

        expect(response).to have_http_status(:ok)
        expect(response_body['id']).to eq(user.id)
        expect(response_body['full_name']).to eq(user.full_name)
        expect(response_body['email']).to eq(user.email)
        expect(response_body['token']).to eq(auth_token)
      end
    end

    context 'when not authenticated' do
      it 'returns unauthorized' do
        get '/users/user_info'

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
