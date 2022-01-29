let urls = [];

const inputElement = document.getElementById('input-element');
const listElement = document.getElementById('list-element');

const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');

const myLocalStorageUrls = JSON.parse(localStorage.getItem('urls'));

if (myLocalStorageUrls) {
  urls = myLocalStorageUrls;
  render(urls);
}

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    urls.push(tabs[0].url);
    localStorage.setItem('urls', JSON.stringify(urls));
    render(urls);
  });
});

inputBtn.addEventListener('click', function () {
  urls.push(inputElement.value);
  inputElement.value = '';
  localStorage.setItem('urls', JSON.stringify(urls));
  render(urls);
});

deleteAllBtn.addEventListener('click', function () {
  localStorage.clear();
  urls = [];
  render(urls);
});

function render(urls) {
  let listItems = '';
  for (let i = 0; i < urls.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${urls[i]}'>
                    ${urls[i]}
                </a>
            </li>
        `;
  }
  listElement.innerHTML = listItems;
}
