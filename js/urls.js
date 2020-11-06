let params = new URLSearchParams(window.location.search);
let count = Number(params.get('count'));
// must be global 
names = [];
for (let i = 0; i < count; i++) {
    names.push(decodeURIComponent(params.get(`name${i}`)));
}

function createURL(names) {
    let base = window.location;
    let count = names.length;
    let query = '?' + `count=${count}`;
    for (let i = 0; i < names.length; i++) {
        console.log(names[i])
        query += `&name${i}=${encodeURIComponent(names[i])}`;
    }
    let spinURL = base + 'spin' + query;
    let groupsURL = base + 'groups' + query;
    let plinkoURL = base + 'plinko' + query;

    let result = select('#result');
    result.html(`<a href=${spinURL}>For spinner: click or bookmark</a><br/>`
        + `<a href=${groupsURL}>For group selection: click or bookmark</a><br/>`
        + `<a href=${plinkoURL}>For plinko: click or bookmark</a>`);
}