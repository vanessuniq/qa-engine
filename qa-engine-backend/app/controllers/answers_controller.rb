class AnswersController < ApplicationController
  def index
    answers = Answer.all
    render json: AnswerSerializer.new(answers).serializable_hash
  end

  def create
    answer = Answer.new(answer_params)
    if answer.save
      render json: AnswerSerializer.new(answer).serializable_hash
    else
      render json: {errors: answer.errors.full_messages}, status: :not_acceptable 
    end
  end

  def update
  end

  def destroy
  end

  private

  def answer_params
    params.require(:answer).permit(:author, :body, :question_id)
  end

end
