require 'rails_helper'

RSpec.describe VideosController, type: :request do
  let(:user_1) { create(:user) }
  let(:user_2) { create(:user) }
  let(:user_3) { create(:user) }
  let!(:video_1) { create(:video, user: user_1 ) }
  let!(:video_2) { create(:video, user: user_2 ) }
  let!(:video_3) { create(:video, user: user_3 ) }

  describe 'GET /videos' do
    it 'returns list of all videos' do
      get '/videos'

      expect(response).to have_http_status(:ok)
      expect(response_body['videos'].length).to eq(3)
      [video_3, video_2, video_1].each_with_index do |video, index|
        expect(response_body['videos'][index]['id']).to eq(video.id)
      end
      [user_3, user_2, user_1].each_with_index do |user, index|
        expect(response_body['videos'][index]['user']['id']).to eq(user.id)
        expect(response_body['videos'][index]['user']['full_name']).to eq(user.full_name)
        expect(response_body['videos'][index]['user']['email']).to eq(user.email)
      end
    end
  end

  describe 'POST /videos' do
    let(:auth_token) { Knock::AuthToken.new(payload: { sub: user_1.id }).token }
    let(:headers) {{
      'Authorization' => "Bearer #{auth_token}",
      'Content-Type' => 'application/json'
    }}
    context 'when valid video parameters are provided' do
      let(:valid_video_params) do
        {
          video: {
            url: 'https://www.youtube.com/watch?v=kK-gcaHoM8M',
            title: 'Hotpot in SaiGon',
            description: 'This place is really good',
          }
        }
      end

      it 'creates a new video' do
        expect do
          post '/videos', params: valid_video_params.to_json, headers: headers
        end.to change(Video, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response_body['url']).to eq(valid_video_params[:video][:url])
        expect(response_body['title']).to eq(valid_video_params[:video][:title])
        expect(response_body['description']).to eq(valid_video_params[:video][:description])
        expect(response_body['user']['id']).to eq(user_1.id)
        expect(response_body['user']['full_name']).to eq(user_1.full_name)
        expect(response_body['user']['email']).to eq(user_1.email)
      end

      it 'broadcast the new video' do
        expect {
        perform_enqueued_jobs do
          post "/videos", params: valid_video_params.to_json, headers: headers
        end
      }.to have_broadcasted_to('video_channel').from_channel(VideosChannel).with do |data|
        expect(data['url']).to eq(video_params[:video][:url])
        expect(data['title']).to eq(video_params[:video][:title])
      end
      end
    end

    context 'when invalid video parameters are provided' do
      let(:invalid_video_params) do
        {
          video: {
            url: '',
            title: '',
          }
        }
      end

      it 'returns error' do
        expect do
          post '/videos', params: invalid_video_params.to_json, headers: headers
        end.not_to change(Video, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response_body['errors']).to include("Url can't be blank")
        expect(response_body['errors']).to include("Title can't be blank")
      end
    end
    
    context 'when unauthorized' do
      it 'returns unauthorized' do
        post '/videos', headers: { 'Content-Type' => 'application/json' }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end