$(function(){

  var buildMessageHTML = function(message) {
    var add_html = (message.content && message.image.url) ?
                  `<p class="lower-message__content">${message.content}</p>
                  <img src="${message.image.url}" class="contents__message__image" >`
                :(message.content) ?
                  `<p class="lower-message__content">${message.content} </p>`
                :(message.image.url)?
                  `<img src="${message.image.url}" class="contents__message__image" >`: "";

      var html = `<div class="contents__message" data-message-id=${message.id}>
                    <div class="contents__message__title">
                      <div class="contents__message__title__name">${message.name}</div>
                      <div class="contents__message__title__time">${message.created_at}</div>
                    </div>
                    <div class="contents__message__text">
                      ${add_html}
                    </div>
                  </div>`;
    return html;
  };


  var reloadMessages = function(){
    last_message_id = $(".contents__message:last").data('messageId');
    current_location = location.href;
    apiUrl = current_location.replace(/messages/g, 'api/messages');

    $.ajax({
      url: apiUrl,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      $.each(messages, function(index, message){
        html = buildMessageHTML(message);
        $('.contents').append(html);
      $(".contents").animate({scrollTop: $('.contents')[0].scrollHeight});
      })
    })
    .fail(function(){
      alert("メッセージ更新に失敗しました");
    })
  }

  function buildHTML(message){
    var image = message.image ? image = `<img src="${message.image}">` : "";
    var html = `<div class="contents__message", data-message-id=${message.id}>
                  <div class="contents__message__title">
                    <p class="contents__message__title__name">${message.name}</p>
                    <p class="contents__message__title__time">${message.created_at}</p>
                  </div>
                  <div class="contents__message__text">${message.content}</div>
                  ${image}
                </div>`
    return html;
  }

  var path = location.href;
  var key = path.match(/messages/);
  if (key){
    setInterval(reloadMessages, 7000);
  }

  $('#form').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents').append(html);
      $('#form')[0].reset();
      $('#footer__send_btn').prop('disabled', false);
      $(".contents").animate({scrollTop: $('.contents')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
});
