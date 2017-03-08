class TasksController < ApplicationController

  def new
    task = Task.new
    respond_to do |format|
      format.json { render "task_form", :locals => { :task=> task} }
    end
  end

  def create
    task = Task.new task_params
    respond_to do |format|
      if task.save
        format.json { render :json => {status: :ok, task: task.to_json } }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def edit
    task = Task.find params[:id]
    respond_to do |format|
      format.json { render "task_form", :locals => { :task=> task } }
    end
  end

  def update
    task = Task.find params[:id]
    respond_to do |format|
      if task.update task_params
        format.json { render :json => {status: :ok, task: task.to_json } }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def destroy
    task = Task.find params[:id]
    respond_to do |format|
      if task.destroy
        format.json { render :json => {status: :ok} }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def take
    task = Task.find params[:task_id]
    respond_to do |format|
      if @current_user.tasks << task
        format.json { render :json => {status: :ok} }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def release
    task = Task.find params[:task_id]
    task.user_id = nil
    respond_to do |format|
      if task.save
        format.json { render :json => {status: :ok} }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def complete
    task = Task.find params[:task_id]
    task.complete = true
    respond_to do |format|
      if task.save
        format.json { render :json => {status: :ok} }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  def reopen
    task = Task.find params[:task_id]
    task.complete = false
    respond_to do |format|
      if task.save
        format.json { render :json => {status: :ok, :user => task.user} }
      else
        format.json { render :json => {status: :unprocessable_entity} }
      end
    end
  end

  private
  def task_params
    params.require(:task).permit(:name, :desc, :points, :project_id)
  end
end
