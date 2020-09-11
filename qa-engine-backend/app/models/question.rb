class Question < ApplicationRecord
    validates :title, :body,  presence: true, length: { minimum: 4}
    validates_presence_of :author
    validates :topic, inclusion: {in: %w(Rails HTML CSS JS), message: "%{value} is not a valid topic in this forum"}
end
