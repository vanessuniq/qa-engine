Rails.application.routes.draw do
  resource :users, only: [:create]
  post '/login', to: "auth#login"
  get '/profile', to: "users#profile"
end
