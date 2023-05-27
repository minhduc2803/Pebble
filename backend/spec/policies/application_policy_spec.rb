describe ApplicationPolicy do
  subject { described_class }

  describe 'scope' do
    let(:user) { create(:user) }
    let(:mock_model) { double('MockModel', all: true) }
    subject { ApplicationPolicy::Scope.new(user, mock_model).resolve }

    it 'shows all models' do
      expect(subject).to be(true)
    end
  end
end
