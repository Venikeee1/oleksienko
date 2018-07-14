export const createElement = ( DOMelement, elementClass) => {
    const element = document.createElement(DOMelement);
    element.classList.add(elementClass);

    return element;
}

