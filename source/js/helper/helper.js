export const createElement = ( DOMelement, elementClass) => {
    const element = document.createElement(DOMelement);
    element.classList.add(elementClass);

    return element;
}

export const wrapFirstLetters = () => {
    const titeles = document.querySelectorAll('.main-title');

    function wrap( letter ) {
        return `<span class="first-letter-animation">${letter}</span>`
    }

    function wrapRest( words ) {
        return `<span class="rest-letters-animation">${words}</span>`
    }

    Array.from(titeles).map( (title) => {
        const text = title.textContent;
        const firstLetter = text.slice(0,1);
        let restWord = text.slice(1);

        if(text.split(' ')[0].length === 1) {
            restWord = `&nbsp;${restWord}`;
        }
        const result = wrap(firstLetter) + wrapRest(restWord);
        title.innerHTML = result;
    })
}

export function showTel(anchor) {
    const anchorElems = document.querySelectorAll(anchor);

    Array.from(anchorElems).forEach(elem => {
        const tel = elem.getAttribute('data-tel');
        elem.addEventListener('click', (e) => {
            if (window.innerWidth > 1024) e.preventDefault();
            e.stopPropagation();

            if (typeof ga === 'function') {
                ga('send', 'event', 'Contact', 'Phone', 'Click');
            }

            elem.textContent = tel;
        })
    })
}

export function addQueryParameterToLinkUrl() {
    let links = document.getElementsByTagName("a");

    for (let index = 0; index < links.length; index += 1) {
        let tempLink = links[index].href, tempParts;

        if (tempLink.indexOf(window.GLOBAL_OBJECT.queryString) === -1) { // The script is looking for all links with the utmInheritingDomain

            tempParts = tempLink.split("#");

            if (tempParts[0].indexOf("?") < 0 ) {
                tempParts[0] += "?" + window.GLOBAL_OBJECT.queryString; // The script adds UTM parameters to all links with the domain you've defined
            } else {
                tempParts[0] += "&" + window.GLOBAL_OBJECT.queryString;
            }

            tempLink = tempParts.join("#");
        }

        links[index].href = tempLink;
    }
};

