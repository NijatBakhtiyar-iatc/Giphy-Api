$("#giphy-form").on("submit", function (e) {
  e.preventDefault();
  $(".btns h2").css({ display: "none" });

  let inputVal = $("#giphy-form input");
  const button = $("<button>");
  button.html(inputVal.val());

  $(".btns").append(button);

  inputVal.val("");

  // fetch api when click button
  button.on("click", function () {
    $(".giphy-apis").empty();

    let buttonText = $(this).html();

    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=2tD2qiRvar4aBQY6mFSREf5SLuRSb4pF&q=${buttonText}&limit=5`
    )
      .then((res) => res.json())
      .then((info) => {
        info.data.map((value) => {
          //create response api divs
          let apiDiv = $("<div class='api'>");
          let apiTitle = $("<h2>");
          apiTitle.html(`${value.title}`);

          let apiLink = $(`<a href='${value.embed_url}' target='_blank'>`);
          apiLink.html("Original Link");

          let apiGif = $(`<img src='${value.images.original_still.url}'>`);
          apiDiv.append(apiTitle, apiLink, apiGif);

          $(".giphy-apis").append(apiDiv);

          // click img to play gif
          let temp = true;
          apiGif.on("click", function () {
            if (temp) {
              $(this).attr("src", `${value.images.original.url}`);
              temp = false;
            } else {
              $(this).attr("src", `${value.images.original_still.url}`);
              temp = true;
            }
          });
        });
      })
      .catch(() => {
        alert("There is no any api, Please add new api button!");
      });
  });
});
