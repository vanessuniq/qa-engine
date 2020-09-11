class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :author, :title, :body, :topic, :created_at
end
