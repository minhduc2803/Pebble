describe UserPolicy do
  subject { described_class }
  let(:user1) { create(:user) }
  let(:user2) { create(:user) }

  permissions :create? do
    it 'always allow access' do
      expect(subject).to permit(user1)
      expect(subject).to permit(user2)
      expect(subject).to permit()
    end
  end

  permissions :user_info? do
    it 'denies access if user tries to access user_info of other user' do
      expect(subject).not_to permit(user1, user2)
    end

    it 'allow access if user is the same' do
      expect(subject).to permit(user1, user1)
    end
  end
end
