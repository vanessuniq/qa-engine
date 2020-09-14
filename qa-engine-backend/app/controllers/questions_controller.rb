class QuestionsController < ApplicationController
  def index
    questions = Question.all
    render json: QuestionSerializer.new(questions).serializable_hash
  end

  def create
    question = Question.new(question_params)
    if question.save
      render json: QuestionSerializer.new(question).serializable_hash
    else
      render json: {errors: question.errors.full_messages}, status: :not_acceptable 
    end
  end

  def destroy
    question = Question.find_by(id: params[:id])
    if question
      question.destroy
    else
      render json: {error: 'Unable to delete question, please try again'}
    end
  end

  private

  def question_params
    params.require(:question).permit(:author, :title, :body, :topic)
  end
  
end
