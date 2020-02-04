
const input = document.querySelector('.shortly__form__input input');
const button = document.querySelector('.shortly__form__input button');
const form = document.forms["rel"]


const handleCreateShortLink = (data: any) => {
    const { hashid: id } = data;
    const shortLink = `https://rel.ink/${id}`
    console.log(shortLink)
}

const submitLink = (e) => {
    e.preventDefault();
    console.log(form.link.value)
    const data = form.link.value;
    const headers = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
    });
    const request = new Request(form.action, {
        method: form.method,
        headers: headers,
        body: JSON.stringify({ url: data })
    });
    fetch(request)
        .then(res => res.json())
        .then(data => handleCreateShortLink(data))
        .catch(err => console.log(err))
}

button.addEventListener('click', submitLink)