describe UsersController, type: :routing do
  describe 'routing' do
    it 'routes to #create' do
      expect(post: '/users').to route_to('users#create')
    end

    it 'routes to #user_info' do
      expect(get: '/users/user_info').to route_to('users#user_info')
    end
  end
end
