const container = $(".posts");
const tags = $(".tags");
const converter = new showdown.Converter();


function render_posts(tag = null,) {
    $.getJSON("assets/posts.json", function (posts) {
        let tag_arr = []
        container.html("");
        tags.html('<p class="tag">all</p>');
        posts.forEach((post) => {
            post.tags.forEach((tag) => {
                if (tag_arr.indexOf(tag) == -1) {
                    tag_arr.push(tag)
                }
            })
        })
        if (tag != null & tag != "all") {
            posts = posts.filter((obj) => obj.tags.indexOf(tag) != -1)
        }
        posts.forEach((post) => {
            $.get(post.file, function (text) {
                post["data"] = text
                let el_div = $('<div class="post"/>').appendTo(container)
                let html = converter.makeHtml(post.data)
                $(html).appendTo(el_div)
                $("<hr/>").appendTo(el_div)
            });
        })
        tag_arr.forEach((tag) => {
            $(`<p class="tag">${tag}</p>`).appendTo(tags)
        })
    });
}

$(document).on('click', '.tag', function () {
    render_posts($(this)[0].innerText)
});

$('#search').keyup(function () {
    if ($(this).val()) {
        let posts = $(".post")
        for (let index = 0; index < posts.length; index++) {
            const el = posts[index];
            if (el.textContent.indexOf($(this).val()) == -1) {
                el.remove();
            }
        }
    } else {
        render_posts()
    }
});

$(document).ready(function () {
    $("#header").load("src/html/header.html")
    render_posts()
});
