require 'bcrypt'

class UserTest < Minitest::Test

  def setup
    User.delete_all
  end

  def test_create
    user = User.create(name: 'Tom')
    assert_equal false, user.valid?
    assert_equal 0, User.all.size
  end

  # 
  # Screens:
  # 

  def test_register
    user = User.register("Tom", "example@gmail.com", "123")
    assert_equal true, user.valid?
    assert_equal 1, User.all.size

    user = User.register("Tom", "example@gmail.com", "123")
    assert_equal false, user.valid?
    assert_equal 1, User.all.size
  end

  def test_login
    user = User.register("Tom", "example@gmail.com", "123")
    assert_equal true, user.valid?
    assert_equal 1, User.all.size

    user = User.login("Tom", "123")
    assert_equal false, user.salt.nil?
    assert_equal false, user.expired.nil?
  end

  def test_auth
    user = User.register("Tom", "example@gmail.com", "123")
    assert_equal true, user.valid?
    assert_equal 1, User.all.size

    user = User.login("Tom", "123")
    assert_equal false, user.salt.nil?
    assert_equal false, user.token.nil?
    assert_equal false, user.expired.nil?

    user2 = User.auth(user.token)
    assert_equal user2.id, user.id
  end
end