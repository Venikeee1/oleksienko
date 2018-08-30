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

