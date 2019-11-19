require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it "is valid with content" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "is valid with image" do
        message = build(:message, content: nil)
        expect(message).to be_valid
      end

      it "is valid with content and image" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without content and image" do
        message = build(:message, content: nil, image:nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "is invalid witout group_id" do 
        message = build(:message, group: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid witout user_id" do 
        message = build(:message, user: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end