module SharedUser
  include Spinach::DSL

  step 'User "John Doe" exists' do
    user_exists("John Doe", {username: "john_doe"})
  end

  step 'User "Mary Jane" exists' do
    user_exists("Mary Jane", {username: "mary_jane"})
  end

  step "I delete my account" do
    visit profile_account_path
    click_link "Delete account"
  end

  protected

  def user_exists(name, options = {})
    User.find_by(name: name) || create(:user, {name: name, admin: false}.merge(options))
  end
end
