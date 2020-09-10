Rails.application.routes.draw do
  resource :questions, only: [:index, :create, :show, :destory]
  
  resource :users, only: [:create]
  post '/login', to: "auth#login"
  get '/profile', to: "users#profile"
end
