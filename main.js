var input = document.querySelector('.shortly__form__input input');
var button = document.querySelector('.shortly__form__input button');
var linksWrapper = document.querySelector('.shortly__form__links');
var form = document.forms["rel"];
var allLinks = [];
var handleDisplayLinks = function (links) {
    var displayAllLinks = links.map(function (link) {
        var short = link.short, long = link.long;
        if (long.length >= 65) {
            long = long.substr(0, 65) + "...";
        }
        return ("<li>\n                <span class=\"full-link\">" + long + "</span>\n                <span>\n                    <span class=\"shortened-link\">" + short + "</span>\n                    <button class=\"copy-button\">copy</button>\n                </span>\n            </li>");
    }).join('');
    linksWrapper.innerHTML = displayAllLinks;
};
var handleCreateShortLink = function (sLink, fLink) {
    var id = sLink.hashid;
    var shortLink = "https://rel.ink/" + id;
    allLinks.push({
        short: shortLink,
        long: fLink
    });
    console.log(allLinks);
    localStorage.setItem("data", JSON.stringify(allLinks));
    handleDisplayLinks(allLinks);
};
var submitLink = function (e) {
    e.preventDefault();
    var fLink = form.link.value;
    var headers = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
    });
    var request = new Request(form.action, {
        method: form.method,
        headers: headers,
        body: JSON.stringify({ url: fLink })
    });
    fetch(request)
        .then(function (res) { return res.json(); })
        .then(function (sLink) { return handleCreateShortLink(sLink, fLink); })["catch"](function (err) { return console.log(err); });
};
button.addEventListener('click', submitLink);
