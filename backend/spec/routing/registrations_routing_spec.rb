describe SessionsController, type: :routing do
  describe 'routing' do
    it 'routes to #create' do
      expect(post: '/users/').to route_to('registrations#create')
    end
  end
end
