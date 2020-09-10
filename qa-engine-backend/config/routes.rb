Rails.application.routes.draw do
  resources :questions, except: [:new, :edit, :update]
  
  resources :users, only: [:create]
  post '/login', to: "auth#login"
  get '/profile', to: "users#profile"
end
