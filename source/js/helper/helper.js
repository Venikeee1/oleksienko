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
        const result = wrap(title.textContent.slice(0,1)) + wrapRest(title.textContent.slice(1));
        title.innerHTML = result;
    })
}

