# README

# DB設計

## users table

| Column         | Type           |Options        |
| :------------- | :------------- |:------------- |
| name           | string         |:null: false, unique: true, index: true|
| email          | string         |:null: false   |
| group          | references     |:null: false, foreign_key: true   |

### Association
- has_many :messeages
- has_many :groups, through: :groups_users

## groups table

| Column         | Type           |Options        |
| :------------- | :------------- |:------------- |
| name           | string         |:null: false, unique: true, index: true|
| user           | references     |:null: false, foreign_key: true   |

### Association
- has_many :messeages
- has_many :users, through: :groups_users

## groups_users table

| Column         | Type           |Options        |
| :------------- | :------------- |:------------- |
| user           | references     |:null: false, foreign_key: true|
| group          | references     |:null: false, foreign_key: true|

### Association
- has_many :groups_users
- has_many :messeages

## messages table

| Column         | Type           |Options        |
| :------------- | :------------- |:------------- |
| body           | text           |:              |
| image          | string         |:              |
| user           | references     |:null: false, foreign_key: true|
| group       | references     |:null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
