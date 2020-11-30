async function postData(url, data = null) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        cache: "no-cache",
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
    });
    return await response.json();
}

async function getData(url, data) {
    const response = await fetch(url, {
        cache: "no-cache",
        credentials: "same-origin",
        method: "GET",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
    });
    return await response.json(); // parses response to JSON
}

export {postData, getData};
