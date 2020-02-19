
const input_container = document.querySelector('.shortly__form__input');
const input = document.querySelector('.shortly__form__input input');
const shorten_button = document.querySelector('.shortly__form__input button');
const links_container = document.querySelector('.shortly__form__links');
const form = document.forms["rel"];
const copyButtons = document.querySelectorAll('.copy-button');
const copyButtonsAncestor = document.querySelector('.shortly__form__links');

const all_shortened_links = JSON.parse(localStorage.getItem("my-shortened-links")) || [];

const handleDisplayLinks = (links) => {
    const display_all_links = links.map((link) => {
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
    links_container.innerHTML = display_all_links;
}

const handleCreateShortLink = (sLink: any, fLink: any) => {
    const { hashid: id } = sLink;
    const short_link = `https://rel.ink/${id}`
    all_shortened_links.push({
        short: short_link,
        long: fLink
    })
    localStorage.setItem("my-shortened-links", JSON.stringify(all_shortened_links))
    handleDisplayLinks(all_shortened_links);
}

const submitLink = (e) => {
    e.preventDefault();
    const value = form.link.value;

    if (value === '') {
        input_container.classList.add('error');
        return;
    }

    else {
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
        getShortLink(request);
    }
}

const handleCopyText = (e) => {
    const short_link = document.querySelector(`.shortened-link[data-link="${e.target.dataset.link}"]`);
    console.log('COPYING', short_link.innerHTML)

    const element = document.createElement('textarea');
    element.value = short_link.innerHTML;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
}

if (all_shortened_links) {
    handleDisplayLinks(all_shortened_links)
}

shorten_button.addEventListener('click', submitLink)
copyButtonsAncestor.addEventListener('click', handleCopyText, false)
