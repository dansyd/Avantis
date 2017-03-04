class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      flash[:success] = "Account created successfully. Welcome to Avantis!"
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    check_if_logged_in
    @user = @current_user
  end

  def update
    @user = @current_user
    @user.update user_params
    if @user.errors.any?
        flash[:error] = ''
      @user.errors.full_messages.each do |error|
        flash[:error] = flash[:error] + "#{error}."
      end
      render :edit
    else
      flash[:success] = "Profile updated successfully"
      redirect_to root_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
