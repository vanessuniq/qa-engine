class QuestionsController < ApplicationController
  def index
  end

  def create
    question = Question.new(question_params)
    if question.save
      render json: QuestionSerializer.new(question).serializable_hash
    else
      render json: {errors: user.errors.full_messages}, status: :not_acceptable 
    end
  end

  def show
  end

  def destroy
  end

  private

  def question_params
    params.require(:question).permit(:author, :title, :body, :topic)
  end
  
end
