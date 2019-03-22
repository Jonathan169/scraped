$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    if(data[i].pic){
      console.log("ho")
    $("#articles").append(`
        <div class="card" data-id="${data[i]._id}" style="width: 18rem;">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <img src="${data[i].pic}">
              </div>
              <div class="col-md-6">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].sum}</p>
                <a href="${data[i].link}" target="_blank" class="card-link">Link to Article</a>
              </div>
            </div>    
          </div>
        </div>`);
    }
    else{
      console.log("yo")
      $("#articles").append(`
        <div class="card" data-id="${data[i]._id}" style="width: 18rem;">
          <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].sum}</p>
                <a href="${data[i].link}" target="_blank" class="card-link">Link to Article</a>  
          </div>
        </div>`)
    }}
});

$(document).on("click", ".card", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
      console.log(data);
      $("#notes").append("<h2 style='color:white'>" + data[0].title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data[0]._id + "' id='savenote' class='btn btn-info'>Save Note</button>");
      if (data[0].note) {
        $("#titleinput").val(data[0].note.title);
        $("#bodyinput").val(data[0].note.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#bodyinput").val("");
});
$("#scrape").on("click",function(event){
  // event.preventDefault()
  $.get("/scrape").then(function(res){
    window.location.assign("/")
  })
})