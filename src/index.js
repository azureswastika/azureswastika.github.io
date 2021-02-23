const container = $(".container");

$.getJSON("src/assets/posts.json", function (posts) {
    posts.forEach((post) => {
        let el_div = $('<div class="post"/>').appendTo(container);
        $(`<h1>${post["header"]}</h1>`).appendTo(el_div);
        $(`<p>${post["text"]}</p>`).appendTo(el_div);
        if (post["image"]) {
            $(`<img src="${post["image"]}" alt="image">`).appendTo(el_div);
        }
        $(`<a class="text-muted" href="${post["link"]}">Открыть</a>`).appendTo(
            el_div
        );
        $("<hr/>").appendTo(el_div);
    });
});
