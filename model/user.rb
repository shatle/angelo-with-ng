class User
  # include ActiveModel
  include Mongoid::Document
  include Mongoid::Timestamps::Short

  # Basic
  field :name, type: String
  field :email, type: String
  field :salt, type: String
  # salt_password
  field :pwd, type: String

  # Login
  field :token, type: String
  field :expired, type: DateTime

end
