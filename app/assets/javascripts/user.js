$(document).on('turbolinks:load', function () { 
  $(function () {
    function appendUser(user) {
      var html =
         `<div class="chat-group-form__field--right">
          <div class="chat-group-user">
          <p class="chat-group-user__name">
            ${user.name}
          </p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id} data-user-name=${user.name}>
          追加
          </a>
        </div>
      </div>`
      $("#user-search-result").append(html);
    };

    function appendNoUser(user) {
      var html =
        `<div class="chat-group-form__field--right">
        <div class="chat-group-user">
          <p class="chat-group-user__name">
            ${user}
          </p>
        </div>
        </div>`
      $("#user-search-result").append(html);
    };

    function addUserToGroup(userId, userName) {
      var html =
        `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${userId}">
        <input name="group[user_ids][]" type="hidden" value="${userId}">
        <p class="chat-group-user__name">
          ${userName}
        </p>
        <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
      </div>`
      $("#chat-group-users").append(html);
    }

    $("#user-search-field").on("keyup", function () {
      var input = $(this).val();
      $.ajax({
        type: "GET",
        url: "/users",
        data: { keyword: input },
        dataType: "json"
      })

        .done(function (users) {
          $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function (user) {
              appendUser(user);
            });
          }
          else {
            appendNoUser("一致するユーザーはいません")
          }
        })

        .fail(function () {
          alert("検索に失敗しました");
        })
    });

    $("#user-search-result").on("click", ".chat-group-user__btn--add", function () {
      var userId = $(this).data("user-id")
      var userName = $(this).attr("data-user-name")
      $(this).parent().remove();
      addUserToGroup(userId, userName);
    })

    $("#chat-group-users").on("click", ".js-remove-btn", function () {
      $($(this).parent()).remove();
    })
  });
});


