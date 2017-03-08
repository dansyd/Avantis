# == Route Map
#
#       Prefix Verb   URI Pattern                  Controller#Action
#         root GET    /                            pages#index
#        users POST   /users(.:format)             users#create
#     new_user GET    /users/new(.:format)         users#new
#    edit_user GET    /users/:id/edit(.:format)    users#edit
#         user PATCH  /users/:id(.:format)         users#update
#              PUT    /users/:id(.:format)         users#update
#     projects GET    /projects(.:format)          projects#index
#              POST   /projects(.:format)          projects#create
#  new_project GET    /projects/new(.:format)      projects#new
# edit_project GET    /projects/:id/edit(.:format) projects#edit
#      project PATCH  /projects/:id(.:format)      projects#update
#              PUT    /projects/:id(.:format)      projects#update
#              DELETE /projects/:id(.:format)      projects#destroy
#        tasks GET    /tasks(.:format)             tasks#index
#              POST   /tasks(.:format)             tasks#create
#     new_task GET    /tasks/new(.:format)         tasks#new
#    edit_task GET    /tasks/:id/edit(.:format)    tasks#edit
#         task PATCH  /tasks/:id(.:format)         tasks#update
#              PUT    /tasks/:id(.:format)         tasks#update
#              DELETE /tasks/:id(.:format)         tasks#destroy
#    dashboard GET    /dashboard(.:format)         projects#index
#        login GET    /login(.:format)             session#new
#              POST   /login(.:format)             session#create
#              DELETE /login(.:format)             session#destroy
#

Rails.application.routes.draw do
  root :to => 'pages#index'
  resources :users, :only => [:new, :create, :edit, :update]
  resources :projects, :except => [:show]
  resources :tasks, :except => [:show]
  get '/dashboard' => 'projects#index'

  get 'projects/:id/member/add' => 'projects#add_member'
  post 'projects/member/add' => 'projects#save_members'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
