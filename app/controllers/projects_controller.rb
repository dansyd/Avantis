class ProjectsController < ApplicationController

  def index
    # Check if logged in, otherwise redirect to login
    if @current_user.present?
      # Check if master, show his projects. If not master check if working on projects
      @projects = @current_user.projects
    else
      redirect_to login_path
    end
  end

  def new
    project = Project.new
    respond_to do |format|
      format.json { render "project_form", :locals => { :project=> project} }
    end
  end

  def create
    project = Project.new project_params
    respond_to do |format|
      if project.save
        format.json { render :json => {status: :ok, project: project.to_json } }
        @current_user.projects << project
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def edit
    project = Project.find params[:id]
    respond_to do |format|
      format.json { render "project_form", :locals => { :project=> project} }
    end
  end

  def update
    project = Project.find params[:id]
    respond_to do |format|
      if project.update project_params
        format.json { render :json => {status: :ok, project: project.to_json } }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def destroy
    project = Project.find params[:id]
    respond_to do |format|
      if project.destroy
        format.json { render :json => {status: :ok} }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def add_member
    project = Project.find params[:id]
    team = project.working_users
    users = User.where('master = false')
    available_users = users - team
    respond_to do |format|
      format.json { render "add_member_form", :locals => { :available_users => available_users } }
    end
  end

  def save_members
    user_ids = params[:user_ids]
    response = []
    user_ids.each do |id|
      user = User.find id
      response << user.name
      project = Project.find params[:project_id]
      project.working_users << user
    end
    respond_to do |format|
      format.json { render :json => {status: :ok, users: response} }
    end
  end

  private
  def project_params
    params.require(:project).permit(:name, :desc, :sprint)
  end

end
