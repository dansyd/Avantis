class SessionController < ApplicationController
  def new
  end

  def create
    user = User.find_by :email => params[:email]
    if user.present?
      if user.authenticate(params[:password])
        session[:user_id] = user.id
        redirect_to projects_path
      else
        flash[:error] = "Invalid password. Please try again."
        redirect_to login_path
      end
    else
      flash[:error] = "Invalid email. Please try again."
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
