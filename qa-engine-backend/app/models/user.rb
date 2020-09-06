class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: {case_sensitive: false}, length: {minimum:4}
    validates :password, presence: true, length: { minimum: 5}, allow_nil: true

end
