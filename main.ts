
const inputWrapper = document.querySelector('.shortly__form__input');
const input = document.querySelector('.shortly__form__input input');
const button = document.querySelector('.shortly__form__input button');
const linksWrapper = document.querySelector('.shortly__form__links');
const form = document.forms["rel"]


const allLinks = JSON.parse(localStorage.getItem("my-shortened-links")) || [];

const handleDisplayLinks = (links) => {
    const displayAllLinks = links.map((link) => {
        let { short, long } = link;
        if (long.length >= 65) {
            long = long.substr(0, 65) + "..."
        }
        return (
            `<li>
                <span class="full-link">${long}</span>
                <hr/>
                <span>
                    <span class="shortened-link" data-link=${short}>${short}</span>
                    <button class="copy-button" data-link=${short}>copy</button>
                </span>
            </li>`
        )
    }).join('')
    linksWrapper.innerHTML = displayAllLinks;
}

const handleCreateShortLink = (sLink: any, fLink: any) => {
    const { hashid: id } = sLink;
    const shortLink = `https://rel.ink/${id}`
    allLinks.push({
        short: shortLink,
        long: fLink
    })
    console.log(allLinks)
    localStorage.setItem("my-shortened-links", JSON.stringify(allLinks))
    handleDisplayLinks(allLinks);
}

const submitLink = (e) => {
    e.preventDefault();
    const value = form.link.value;
    console.log(value)
    const is_Url_valid = validURL(value)
    console.log(is_Url_valid)

    if (value === '') {
        inputWrapper.classList.add('error');
        return;
    } else if (is_Url_valid == false) {
        alert('Enter a valid url');
        return;
    } else {
        const fLink = value;
        const headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
        const request = new Request(form.action, {
            method: form.method,
            headers: headers,
            body: JSON.stringify({ url: fLink })
        });

        //-------------------------------------------------------------------
        //using async and await (start)
        //-------------------------------------------------------------------

        async function getShortLink(req) {
            try {
                let response = await fetch(req);
                let sLink = await response.json();
                return handleCreateShortLink(sLink, fLink)
            }
            catch (err) {
                console.log(err)
            }
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


}

if (allLinks) {
    handleDisplayLinks(allLinks)
}

button.addEventListener('click', submitLink)


function validURL(myURL) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(myURL);
}


const handleCopyText = (e) => {
    const shortLink = document.querySelector(`.shortened-link[data-link="${e.target.dataset.link}"]`);
    console.log(shortLink.innerHTML)

    const element = document.createElement('textarea');
    element.value = shortLink.innerHTML;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
}

const copyButtons = document.querySelectorAll('.copy-button');

copyButtons.forEach(copyButton => copyButton.addEventListener('click', handleCopyText))