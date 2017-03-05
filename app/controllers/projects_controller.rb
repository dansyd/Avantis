class ProjectsController < ApplicationController

  def index
    # Check if logged in, otherwise redirect to login
    if @current_user.present?
      # Check if master, show his projects. If not master check if working on projects
      if @current_user.master?
        @projects = @current_user.projects
      else
        @projects = @current_user.working_projects
      end
    else
      redirect_to login_path
    end
  end

  def create
    project = Project.new project_params
    project.user_id = @current_user.id
    respond_to do |format|
      if project.save
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
