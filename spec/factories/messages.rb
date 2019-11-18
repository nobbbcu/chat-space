FactoryBot.define do
  factory :message do
    content  {Faker::Lorem.sentence}
    image    {File.open("#{Rails.root}/public/uploads/message/image/10/ダウンロード.jpeg")}
    user
    group
  end
end