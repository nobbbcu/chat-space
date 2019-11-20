json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.created_at message.created_at.to_s(:datetime)
  json.name message.user.name
  json.id message.id
end