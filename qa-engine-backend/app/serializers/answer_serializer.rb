class AnswerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :author, :body, :created_at, :question_id
  belongs_to :question
end
