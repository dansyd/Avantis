class UsersController < ApplicationController
  before_action :check_if_logged_in, :only => [:edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if user_params[:avatar].present?
      req = Cloudinary::Uploader.upload(user_params[:avatar], :folder => 'avantis-app/')
      @user.avatar = req["public_id"]
    end
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
    old_avatar = @user.avatar
    if user_params[:avatar].present?
      req = Cloudinary::Uploader.upload(user_params[:avatar], :folder => 'avantis-app/')
    end
    @user.update user_params
    if req.present?
      @user.avatar = req["public_id"]
      @user.save
    end
    if @user.errors.any?
        flash[:error] = ''
      @user.errors.full_messages.each do |error|
        flash[:error] = flash[:error] + "#{error}."
      end
      render :edit
    else
      flash[:success] = "Profile updated successfully"
      if req.present?
        Cloudinary::Uploader.destroy( old_avatar )
      end
      redirect_to root_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:avatar, :email, :password, :password_confirmation)
  end
end
