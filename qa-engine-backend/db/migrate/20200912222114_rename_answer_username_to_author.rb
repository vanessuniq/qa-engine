class RenameAnswerUsernameToAuthor < ActiveRecord::Migration[6.0]
  def change
    rename_column :answers, :username, :author
  end
end
