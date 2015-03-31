class UserTest < Minitest::Test

  def setup
    User.delete_all
  end

  def test_create
    User.create(name: 'Tom')
    assert_equal User.all.size, 1
  end
end