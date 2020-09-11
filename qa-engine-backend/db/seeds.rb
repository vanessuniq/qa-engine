title = ['html tags', 'active record scope', 'js iterators', 'form styling']
topic = %w(HTML Rails JS CSS)
(0..3).to_a.each do |num|
    author = Faker::Name.unique.name
    body = Faker::Lorem.question
    Question.create(author:author, title: title[num], topic: topic[num], body: body)

end
