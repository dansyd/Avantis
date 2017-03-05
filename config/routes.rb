# == Route Map
#
#      Prefix Verb   URI Pattern               Controller#Action
#        root GET    /                         pages#index
#       users POST   /users(.:format)          users#create
#    new_user GET    /users/new(.:format)      users#new
#   edit_user GET    /users/:id/edit(.:format) users#edit
#        user PATCH  /users/:id(.:format)      users#update
#             PUT    /users/:id(.:format)      users#update
#    projects POST   /projects(.:format)       projects#create
# new_project GET    /projects/new(.:format)   projects#new
#   dashboard GET    /dashboard(.:format)      projects#index
#       login GET    /login(.:format)          session#new
#             POST   /login(.:format)          session#create
#             DELETE /login(.:format)          session#destroy
#

Rails.application.routes.draw do
  root :to => 'pages#index'
  resources :users, :only => [:new, :create, :edit, :update]
  resources :projects, :only => [:new, :create]
  get '/dashboard' => 'projects#index'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
