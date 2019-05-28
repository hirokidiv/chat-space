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
    }

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