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

  # 
  # Validation
  # 
  validates_presence_of :name, :email, :pwd
  validates_uniqueness_of :name, :email
  validates :name, length: { minimum: 3, maximum: 20}, format: { with: /\A[A-Za-z0-9]+\z/i }
  validates :email, format: { :with => /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/i }

  # 
  # Constant
  # 
  ExpiredMinutes = 10

  # 
  # User.methods:   class's methods
  # 
  class << self
    def gen_salt
      BCrypt::Engine.generate_salt
    end

    def gen_salt_password(salt, password)
      BCrypt::Engine.hash_secret(password, salt)
    end

    def gen_token
      SecureRandom.urlsafe_base64(16)
    end

    def register(name, email, password)
      user = User.new(name: name, email: email)
      user.salt = User.gen_salt
      user.pwd = gen_salt_password(user.salt, password)
      user.save
      user # should validate .valid? in controller
    end

    def login(name_or_email, password)
      # should add table index: name, email
      user = User.where(email: name_or_email).first if name_or_email.include? '@'
      user ||= User.where(name: name_or_email).first
      return nil if user.nil? || user.pwd != gen_salt_password(user.salt, password)
      return user.reload if user.update_attributes({:token=> gen_token, :expired=> Time.now+ExpiredMinutes.minutes })
      nil
    end

    def auth(token)
      # should add table index: token
      user = User.where(token: token).first
      return nil if !user || user.expired < Time.now
      user
    end
  end

  # 
  # user.methods:   instance's methods
  # 
  

end
