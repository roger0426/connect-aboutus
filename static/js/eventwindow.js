$(document).ready(function(){

  //eventwindow likes & participants hover name
  $(document).on("mouseenter", ".member", function() {
//    console.log('enter')
    $(this).siblings('.member-hover').show();
  });
  $(document).on("mouseleave", ".member", function() {
//    console.log('leave')
    $(this).siblings('.member-hover').hide();
  });

  $("#exitbtn1, #filter1").click(function() {
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#eventjoinwindow").animate({opacity: 0}, 400, function() {
      reset_event_window();
      $("#eventjoinwindow").hide();
    $("#eventjoinwindow").css({height: 0})
    })
    $("#eventcontrol").animate({opacity: 0}, 400, function() {
      $("#eventcontrol").hide();
    $("#eventcontrol").css({height: 0})
    })
    
    $("#filter1").animate({opacity: 0}, 150, function() {
      $("#filter1").hide();
    })
  });
  
  //event join exit
  $("#exitbtn3").click(function() {
    //console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventjoinwindow").animate({height: 0, opacity: 1}, 400, function() {
      $("#eventjoinwindow").hide();
    })
  });
  
  //event control center
  $("#exitbtn4").click(function() {
    console.log("click event exit");
    $('body').css({'overflow': 'auto'});
    $("#eventcontrol").animate({opacity: 0}, 400, function() {
      $("#eventcontrol").hide();
    })
  });
  
});

$(document).on('click', ".eventjoin-btn", function() {
  //console.log("click event join");
  $("#eventjoinwindow").show();
  $("#eventjoinwindow").animate({'height': '75%', opacity: 1}, 400, function() {
  })
})

$(document).on('click', ".eventedit-btn", function() {
  //console.log("click event join");
  $("#eventcontrol").show();
  $("#eventcontrol").animate({'height': '75%', opacity: 1}, 400, function() {
  })
})

function reset_event_window() {
  // restore to the beginning status of event window
  $("#event-title").replaceWith(
    "<div id='event-title'></div>"
  );
  $("#event-subtitle").replaceWith(
    "<div id='event-subtitle'></div>"
  );
  $("#event-detail").replaceWith(
    "<div id='event-detail'></div>"
  )
  // $("#eventwindow-bg").replaceWith(
  //   "<div id='eventwindow-bg'>\
  //     <div id='eventpic'>\
  //       <img class='pic' style='display:none'>\
  //       <p>目前沒有圖片</p>\
  //     </div>\
  //   </div>"
  // );
  $("#edit-confirm-btn").replaceWith(
    "<input type='button' class='eventedit-btn' value='編輯活動'>"
  );
  $("#edit-cancel-btn").remove();
}
                  
function event_handler(URL, user_id, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {},
    dataType: 'json',
    success: function(data) {
      
      // console.log("ajax success----------");
      // console.log(data)
      // console.log("title:", data.title);
      // console.log("subtitle:", data.subtitle);
      // console.log("host:", data.host);
      // console.log("image:", data.image);
      // console.log("likes", data.likes);
      // console.log("participants:", data.particitants);
      // console.log("host:", data.host_id);
      // console.log("host-pic:", data.host_pic);
      
      if(data.image != null) {
        $("#eventwindow" + " #eventpic" + " img").attr('src', data.image);
        $("#eventwindow" + " #eventpic" + " img").show();
        $("#eventwindow" + " #eventpic" + " p").hide();
      }
      else {
        $("#eventwindow" + " #eventpic" + " img").hide();
        $("#eventwindow" + " #eventpic" + " p").show();
      }
      $("#eventwindow" + " #event-title").html(data.title);
      $("#eventwindow" + " #event-subtitle").html(data.subtitle);
      $('#event-require').html('');
      if(data.requirements != undefined) {
        data.requirements.forEach(function(item, i) {
          if(item != "") {
            $("#eventwindow" + " #event-require").append("<div id='requiretag'>" + item + "</div>");
          }
        });
      };
      $("#eventwindow" + " #description" + " #event-date").html("活動日期<br />" + data.event_date);
      $("#eventwindow" + " #description" + " #due-date").html("報名截止<br />" + data.due_date);
      $("#eventwindow" + " #event-detail").html(data.detail);
      
      $("#eventwindow" + " #eventoperate" + " #organizer-link").attr('href', "/profile/" + data.host_id);
      $("#eventwindow" + " #eventoperate" + " #organizer-pic").attr('src', data.host_pic);
      $("#eventwindow" + " #eventoperate" + " .member-hover").text(data.host_name);
      
      $("#member").html("");
      $("#eventmsg-board").html("<div id=\"eventmsg\" style=\"display: none\" class=\"eventmsg\"><a><img class=\"sender\"></a><div id=\"eventmsg-right\"><div id=\"eventmsg-righttop\"><a id=\"eventmsg-sendername\"></a><p id=\"event-date\"></p></div><div id=\"eventmsg-rightbottom\"><p id=\"eventmsgtext\"></p></div></div></div>");
      
      
      if(data.comments != undefined) {
        data.comments.forEach(function(item, i) {
          var clone_id = duplicate_multi('eventmsg');
          $('#' + clone_id).show();
          // get_user_ajax
          $.ajax({
            type: 'post',
            url: "/get_user_detail/",
            data: {
              'user_id': item.author_id
            },
            dataType: 'json',
            success: function(data) {
              if (data.status == 200) {
                user_name = data.user_name;
                user_img_url = data.user_img_url;
                $('#' + clone_id + ' #eventmsg-sendername').html(data.user_name);
                $('#' + clone_id + " a").attr('href', 'profile/' + item.author_id);
                $('#' + clone_id + " img").attr('src', data.user_img_url);
                $('#' + clone_id + ' #event-date').html(item.date);
                $('#' + clone_id + " #eventmsgtext").html(item.text);
              } else {
                console.log('[Error] get user ' + item.author_id + " error");
              }
            }
          });
        });
      };
      
      $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
      $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
      if(data.likes != undefined) {
        data.likes.forEach(function(item, i) {
          if(item.id == user_id) {
            $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
            $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
          }
          let str = "<a href='/profile/" + item.id + "'>\
                      <img class='member interested' src='https://res.cloudinary.com/connect-universe/image/upload/v1/" + item.img + "'>\
                      <p class='member-hover'>" + item.full_name + "</p>\
                    </a>";
          
          $("#eventoperate #member").prepend(str);
        });
      };
      
      if(data.particitants != undefined) {
        data.particitants.forEach(function(item, i) {
          let str = "<a href='/profile/" + item.id + "'>\
                      <img class='member participant' src='https://res.cloudinary.com/connect-universe/image/upload/v1/" + item.img + "'>\
                      <p class='member-hover'>" + item.full_name + "</p>\
                    </a>";
          
          $("#eventoperate #member").prepend(str);
        });
      };

      // join window
      if (user_id == data.host_id) {
        $(".eventjoin-btn").hide();
        $(".eventedit-btn").show();
      } else {
        $(".eventjoin-btn").show();
        $(".eventedit-btn").hide();
      }
      switch (data.join_status) {
        case 1:
          $(".eventjoin-btn").attr("value", "審核中");
          $(".eventjoin-btn").attr("disabled", true);
          break;
        case 2:
          $(".eventjoin-btn").attr("value", "取消加入");
          $(".eventjoin-btn").attr("disabled", false);
          break;
        case 3:
          $(".eventjoin-btn").attr("value", "無法加入");
          $(".eventjoin-btn").attr("disabled", false);
          break;
        default:
          $(".eventjoin-btn").attr("value", "申請加入");
          $(".eventjoin-btn").attr("disabled", false);
          break;
      }

      $("#requirement-tags").empty();
      data.requirements.forEach(function(requirement) {
        if (requirement != "") {
          $("#requirement-tags").append(
            "<p class='requirement-tag' style='background-color: rgb(189, 189, 189)'>" + requirement + "</p>"
          );
        }
      });
    },
    complete: function(data) {
      //lock background
      $('body').css({'overflow': 'hidden'});
      $("#eventwindow").css({'display': 'flex'});
      $("#filter1").show();
//      $("#eventwindow").css({'opacity': 1});
      $("#eventwindow").animate({'opacity': 1}, 200);
      $("#filter1").animate({'opacity': 1}, 200);
    },
    error: function(data) {
      console.log("ajax error");
    }
  })

};
$(document).on("click", "p.requirement-tag", function() {
  if ($(this).css("background-color") == "rgb(189, 189, 189)") {
    $(this).css("background-color", "rgb(255, 173, 148)")
  } else {
    $(this).css("background-color", "rgb(189, 189, 189)")
  }
})

function edit_event_transition() {
  $("#event-title").replaceWith(
    "<input type='text' id='event-title' placeholder='" + $("#event-title").text() +"'>"
  );
  $("#event-subtitle").replaceWith(
    "<input type='text' id='event-subtitle' placeholder='" + $("#event-subtitle").text() +"'>"
  );
  $("#event-detail").replaceWith(
    "<textarea id='event-detail' placeholder='" + $("#event-detail").text() + "'>"
  );
  // $("#eventwindow-bg").replaceWith(
  //   "<input type='file' name='image' alt='image' id='eventwindow-bg'>"
  // );
  $(".eventedit-btn").replaceWith(
    "<input type='button' id='edit-confirm-btn' value='確認'>\
    <input type='button' id='edit-cancel-btn' value='取消'>"
  );
  $('body').css({'overflow': 'auto'});
  $(".eventsubwindow").animate({height: 0, opacity: 1}, 400, function() {
    $(".eventsubwindow").hide();
  });
}

function edit_event_handler(URL, CSRF, event_id) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: "POST",
    url: URL,
    data: {
      'event_id': event_id,
      'title': $("#event-title").val(),
      'subtitle': $("#event-subtitle").val(),
      'detail': $("#event-detail").val()
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log("modify event successfully");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已修改活動',
          text: "正在跳轉回主頁面",
          showConfirmButton: false,
        })
        setTimeout(function(){
          location.reload();
        }, 1000);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '喔不出錯了',
          text: data.error_message,
          showConfirmButton: false,
          timer: 2000,
        })
      }
    }
  });
}

function delete_event_handler(URL, CSRF, event_id) {
  Swal.fire({
    title: '你確定嗎？',
    text: "刪除後將不可恢復",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '刪掉他'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        data: {
          csrfmiddlewaretoken: CSRF
        }
      });
      $.ajax({
        type: "POST",
        url: URL,
        data: {
          'event_id': event_id,
        },
        dataType: 'json',
        success: function(data) {
          if (data.status == 200) {
            console.log("delete event successfully");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '已刪除活動',
              text: "正在跳轉回主頁面",
              showConfirmButton: false,
            })
            setTimeout(function(){
              location.reload();
            }, 1000);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '喔不出錯了',
              text: data.error_message,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        }
      });
    }
  })
  
}

function like_handler(URL, event_id, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
//      event_id: event_id,
    },
    dataType: 'json',
    success: function(data) {
      if (data.status == 200) {
        console.log('success')
        let img_url = data.user_img_url;
        let hostname = $(location).attr('hostname');
        let like_sum = parseInt($('#' + event_id + ' #likesnum').text());
        if (data.add) {
          let profile_url = hostname + '/profile/' + data.user_id
          let str = "<a herf='" + profile_url + "'>\
          <img class='member interested' src= " + img_url + "></a>";
          //console.log(str);
          $('#likebutton').css("background-image", "url(/static/file/like-bg-y.png");
          $('#likebutton button').attr("src", "/static/file/like-bg-y.png");
          $('#' + event_id + " #likeicon").attr("src", "/static/file/like-y.png");
          $('#member').append(str);
          $('#' + event_id + ' #likesnum').text(like_sum + 1);
        } else if (data.remove) {
          let user_selector = "#member a img[src='" + img_url + "']";
          //console.log(user_selector)
          $('#likebutton').css("background-image", "url(/static/file/like-bg-n.png");
          $('#likebutton button').attr("src", "/static/file/like-bg-n.png");
          $('#' + event_id + " #likeicon").attr("src", "/static/file/like-grey.png");
          $(user_selector).remove();
          $('#' + event_id + ' #likesnum').text(like_sum - 1);
        }
      } else {
        console.log("[Error]: like ajax error");
      }
    }
  })
}

function message_handler(URL, event_id, CSRF) {
  $.ajaxSetup({
    data: {
      csrfmiddlewaretoken: CSRF
    }
  });
  $.ajax({
    type: 'post',
    url: URL,
    data: {
      'text': $("input.eventmsg-insert").val()
    },
    dataType: 'json',
    success: function(data) {
      if($(".eventmsg #eventmsg-right #eventmsg-righttop p#event-date").text() == '目前沒有留言喔～') {
        $("#eventmsg-board").empty();
      }
      
      var clone_id = duplicate_multi('eventmsg');
      console.log(clone_id);
      $('#' + clone_id + " img").attr('src', data.author_img_url);
      $('#' + clone_id + ' #eventmsg-sendername').html(data.author_name);
      $('#' + clone_id + ' #event-date').html(data.msg_date);
      $('#' + clone_id + " #eventmsgtext").html($("input.eventmsg-insert").val());
      console.log($("input.eventmsg-insert").val());
      $('#' + clone_id).show();
      $("input.eventmsg-insert").val("");
    }
  })
}

var i = 0;
function duplicate_multi(duplicateID) {
  var original = document.getElementById(duplicateID);
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = duplicateID + '_new' + ++i;
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.insertBefore(clone, original.parentNode.firstChild);
  return clone.id
}


//function duplicate(duplicateID) {
//  var original = document.getElementById(duplicateID);
//  var clone = original.cloneNode(true); // "deep" clone
//  clone_id = duplicateID;
//  // or clone.id = ""; if the divs don't need an ID
//  original.parentNode.insertBefore(clone, original.parentNode.firstChild);
//  //$("eventpost").parent.prepend();
//};