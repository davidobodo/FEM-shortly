var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inputWrapper = document.querySelector('.shortly__form__input');
var input = document.querySelector('.shortly__form__input input');
var button = document.querySelector('.shortly__form__input button');
var linksWrapper = document.querySelector('.shortly__form__links');
var form = document.forms["rel"];
var allLinks = JSON.parse(localStorage.getItem("my-shortened-links")) || [];
var handleDisplayLinks = function (links) {
    var displayAllLinks = links.map(function (link) {
        var short = link.short, long = link.long;
        if (long.length >= 65) {
            long = long.substr(0, 65) + "...";
        }
        return ("<li>\n                <span class=\"full-link\">" + long + "</span>\n                <hr/>\n                <span>\n                    <span class=\"shortened-link\" data-link=" + short + ">" + short + "</span>\n                    <button class=\"copy-button\" data-link=" + short + ">copy</button>\n                </span>\n            </li>");
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
    localStorage.setItem("my-shortened-links", JSON.stringify(allLinks));
    handleDisplayLinks(allLinks);
};
var submitLink = function (e) {
    e.preventDefault();
    var value = form.link.value;
    console.log(value);
    var is_Url_valid = validURL(value);
    console.log(is_Url_valid);
    if (value === '') {
        inputWrapper.classList.add('error');
        return;
    }
    else if (is_Url_valid == false) {
        alert('Enter a valid url');
        return;
    }
    else {
        var fLink_1 = value;
        var headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
        var request = new Request(form.action, {
            method: form.method,
            headers: headers,
            body: JSON.stringify({ url: fLink_1 })
        });
        //-------------------------------------------------------------------
        //using async and await (start)
        //-------------------------------------------------------------------
        function getShortLink(req) {
            return __awaiter(this, void 0, void 0, function () {
                var response, sLink, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch(req)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            sLink = _a.sent();
                            return [2 /*return*/, handleCreateShortLink(sLink, fLink_1)];
                        case 3:
                            err_1 = _a.sent();
                            console.log(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        //-------------------------------------------------------------------
        //using async and await (end)
        //-------------------------------------------------------------------
        getShortLink(request);
        //-------------------------------------------------------------------
        //using promises (start)
        //-------------------------------------------------------------------
        // const getShortLink = (req) => {
        //     fetch(req)
        //         .then(res => res.json())
        //         .then(sLink => handleCreateShortLink(sLink, fLink))
        //         .catch(err => console.log(err))
        // }
        //-------------------------------------------------------------------
        //using promises (end)
        //-------------------------------------------------------------------
    }
};
if (allLinks) {
    handleDisplayLinks(allLinks);
}
button.addEventListener('click', submitLink);
function validURL(myURL) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(myURL);
}
var handleCopyText = function (e) {
    var shortLink = document.querySelector(".shortened-link[data-link=\"" + e.target.dataset.link + "\"]");
    console.log(shortLink.innerHTML);
    var element = document.createElement('textarea');
    element.value = shortLink.innerHTML;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
};
var copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(function (copyButton) { return copyButton.addEventListener('click', handleCopyText); });
