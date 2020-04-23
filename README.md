# Chat-space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique:false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :users_groups 
- has_many :groups, throught: :users_groups


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users_groups 
- has_many :users, throught: :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null :false, foreign_key: true|
|user_id|integer|null :false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|group_id|integer|null :false, foreign_key: true|
|user_id|integer|null :false, foreign_key: true|
## Association
- belongs_to :group
- belongs_to :user


