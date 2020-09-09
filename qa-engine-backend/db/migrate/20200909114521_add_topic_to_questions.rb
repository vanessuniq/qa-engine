class AddTopicToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :topic, :string
    
  end
end
