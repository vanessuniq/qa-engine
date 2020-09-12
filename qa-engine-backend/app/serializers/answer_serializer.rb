class AnswerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :question_id, :author, :body, :updated_at
end
