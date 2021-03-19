let data = null;
let url = 'http://localhost/ajax_zadanie/firma.json';
let getBundle = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let dataT = document.querySelector('#dType');
    dataT.textContent = xhr.responseType;
    xhr.open('GET', url, async = true);
    xhr.send();
    console.log(xhr.response);
    xhr.addEventListener('readystatechange', e => {
        if (xhr.readyState !== 4) {
            console.log(xhr.readyState)
        }
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response);
            }
            if (xhr.status === 404) {
                console.log('Brak zasobu');
            }
            if (xhr.status === 500) {
                console.log('Serwer nie odpowiada');
            }
            if (xhr.status === 503) {
                console.log('Spróbuj za chwile');
            }
        }
    }, false);
    xhr.addEventListener('load', e => {
        data = xhr.response;
        if (data !== null) {
            let i = 1;
            let timeInt = 1000;
            let t1 = setInterval(function () {
                if (i == data.length - 1) {
                    clearInterval(t1);
                }
                insItem(i++, data[i - 1]);
            }, timeInt);
        }
    }, false);
}
let insItem = (i, item) => {
    let main = document.querySelector('#main');
    let tpl = document.querySelector('#rowTplt');
    let rows = document.querySelector('#rows');
    let r2 = tpl.content.cloneNode(true);
    let rid = r2.querySelector('#row-');
    rid.id = rid.id + i;
    let cells = r2.querySelectorAll('p');
    cells[0].textContent = i;
    cells[1].textContent = item.imie;
    cells[2].textContent = item.nazwisko;
    cells[3].textContent = item.stanowisko;
    main.appendChild(r2);
    rows.textContent = i;

}
window.addEventListener('load', getBundle, false);