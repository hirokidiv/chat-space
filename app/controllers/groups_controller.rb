class GroupsController < ApplicationController
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def new
    @group = Group.new
    @group.users << current_user
  end
  
  private
  def group_params
    # params.require(:chat_group).permit(:name)
    params.require(:group).permit(:name, { user_ids: []})
  end
end
