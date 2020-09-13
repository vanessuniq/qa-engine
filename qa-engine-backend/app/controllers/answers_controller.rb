class AnswersController < ApplicationController
  before_action :find_answer, only: [:update, :destroy]
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
    if @answer.update(answer_params)
      render json: AnswerSerializer.new(@answer).serializable_hash
    else
      render json: {error: @answer.errors.full_messages.first}, status: :not_acceptable 
    end
  end

  def destroy
    @answer.destroy
  end

  private

  def answer_params
    params.require(:answer).permit(:author, :body, :question_id)
  end

  def find_answer
    @answer = Answer.find_by(id: params[:id])
    render json: {error: 'Answer not found'} unless @answer
  end
  

end
