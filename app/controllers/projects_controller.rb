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

  private
  def project_params
    params.require(:project).permit(:name, :desc, :sprint)
  end

end
