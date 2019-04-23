class Group < ApplicationRecord
  has_many :messeages
  has_many :group_users
  has_many :users, through: :group_users
end
