$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="chat-main__list__message" data-message-id=${message.id}>
          <div class="chat-main__list__message__info">
            <div class="chat-main__list__message__info__name">
              ${message.user_name}
            </div>
            <div class="chat-main__list__message__info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__list__message__text">
            <p class="chat-main__list__message__text__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image}>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="chat-main__list__message" data-message-id=${message.id}>
          <div class="chat-main__list__message__info">
            <div class="chat-main__list__message__info__name">
              ${message.user_name}
            </div>
            <div class="chat-main__list__message__info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__list__message__text">
            <p class="chat-main__list__message__text__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }
  var reloadMessages = function(){
    var last_message_id = $('.chat-main__list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__list').append(insertHTML);
        $('.chat-main__list').animate({ scrollTop: $('.chat-main__list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
   };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__list').append(html);
   })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
   })
   .always(function(){
    $('.chat-main__list').animate({ scrollTop: $('.chat-main__list')[0].scrollHeight});
    $('form')[0].reset();
    $('.form__send--btn').prop('disabled',false);
   })
  })
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});