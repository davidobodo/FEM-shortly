
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
                    <span class="shortened-link">${short}</span>
                    <button class="copy-button">copy</button>
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
    if (form.link.value === '') {
        return inputWrapper.classList.add('error')
    }
    const fLink = form.link.value;
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



    //-------------------------------------------------------------------
    //using async and await (start)
    //-------------------------------------------------------------------
    async function getShortLink(req) {
        try {
            console.log(req)
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
}

if (allLinks) {
    handleDisplayLinks(allLinks)
}

button.addEventListener('click', submitLink)
