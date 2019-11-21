$(function(){
  function buildHTML(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</div>
              </div>`
    $('#user-search-result').append(html);
  }
  function buildError(){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>
              `
    $('#user-search-result').append(html)
  }
  function  addChatMember(name, id){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${id}'> 
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $('#chat-group-users').append(html)
  }

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();   //フォームの値を取得して変数に代入する
    $("#user-search-result").empty();
  $.ajax({
    type: 'GET',
    url: '/users',
    dataType: 'json',
    data: { keyword: input },
  })
    .done(function(users){
      if (users){
        $.each(users, function(index,user){
          buildHTML(user);
        })
      }else{
        buildError();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })

  $(document).on('click',".chat-group-user__btn--add", function(){
    var user_name = $(this).attr("data-user-name");
    var user_id = $(this).attr("data-user-id");
    addChatMember(user_name,user_id);
    $(this)
      .parent()
      .remove();
    
  });
  $(document).on('click',".chat-group-user__btn--remove", function(){
    $(this)
      .parent()
      .remove();
  });

});