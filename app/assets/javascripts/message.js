$(function(){

  function buildHTML(message){

    var image = message.image ? image = `<img src="${message.image}">` : "";
    var html = `<div class="contents__message">
    <div class="contents__message__title">
    <p class="contents__message__title__name">${message.name}</p>
    <p class="contents__message__title__time">${moment(message.created_at).format('YYYY/MM/DD HH:mm')}</p>
    </div>
    <div class="contents__message__text">${message.content}</div>
    ${image}
    </div>`
    return html;
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
