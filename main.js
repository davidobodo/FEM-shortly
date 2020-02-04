var input = document.querySelector('.shortly__form__input input');
var button = document.querySelector('.shortly__form__input button');
var form = document.forms["rel"];
var handleCreateShortLink = function (data) {
    var id = data.hashid;
    var shortLink = "https://rel.ink/" + id;
    console.log(shortLink);
};
var submitLink = function (e) {
    e.preventDefault();
    console.log(form.link.value);
    var data = form.link.value;
    var headers = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
    });
    var request = new Request(form.action, {
        method: form.method,
        headers: headers,
        body: JSON.stringify({ url: data })
    });
    fetch(request)
        .then(function (res) { return res.json(); })
        .then(function (data) { return handleCreateShortLink(data); })["catch"](function (err) { return console.log(err); });
};
button.addEventListener('click', submitLink);
