describe UsersController, type: :routing do
  describe 'routing' do
    it 'routes to #update' do
      expect(put: '/user').to route_to('users#update', format: :json)
    end

    it 'routes to #show' do
      expect(get: '/user').to route_to('users#show', format: :json)
    end
  end
end
