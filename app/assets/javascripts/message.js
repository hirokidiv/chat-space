$(function () {
  function buildHTML(message){
    var body = message.body.present ? `${message.body}` : '';
    var img = message.image ? `<img src=${message.image}>` : '';
    var html = `<div class="message__upper-info>
                  <div class="message__upper-info__user">
                    ${ message.user.name }
                  </div>
                  <div class="message__upper-info__date">
                    ${ message.created_at.strftime("%Y/%m/%d %H:%M") }
                  </div>
                </div>
                <div class="message__Text">
                  ${ body }
                </div>
                <img src=${ img }>
                `
    return html
  }
  
  $(".new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    console.log(url);
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
          $(".message").append(html)
          $(".input-box__text").val("")
        })
        .fail(function(){
          alert("error");
        })
  })
});