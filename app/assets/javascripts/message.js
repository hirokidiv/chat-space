$(document).on('turbolinks:load', function(){ 
  $(function(){
    function buildHTML(message){
      var body = message.body? `${message.body}` : '';
      var img = message.image? `${message.image}` : '';
      var html = `<div class="message" data-id="${message.id}">
                    <div class="message__upper-info">
                      <div class="message__upper-info__user">
                        ${message.name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__Text">
                      ${ body }
                    </div>
                    <img src="${ img }">
                  </div>`
      return html
    };

    var reloadMessages = function () {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $(".message:last").data("id");
      var group_id = $(".messages").data("group-id")
      var url = `/groups/${group_id}/api/messages`
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: { id: last_message_id}
      })
        .done(function (messages) {
          var insertHTML = "";
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          messages.forEach(function(message){
            insertHTML += buildHTML(message);
            console.log( buildHTML(message) );
          });
          //メッセージが入ったHTMLを取得
          $(".messages").append(insertHTML)
        })
        .fail(function () {
          console.log('error');
        });
    };
        

    setInterval(reloadMessages, 5000);
  

    $("#new_message").on("submit", function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr("action");
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false
      })
        .done(function(data){
          var html = buildHTML(data)
          $(".messages").append(html)
          $(".input-box__text").val("");
          $(".image-label__input").val("");
          $(".new-message__submit-btn").attr("disabled", false);
          $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 'fast');
        })
        .fail(function(){
          alert("error");
        })
    })
  })
});