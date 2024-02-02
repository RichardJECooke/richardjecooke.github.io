"use strict";
function swapCell() {
    const cells = document.querySelectorAll('tbody td');
    let index1 = Math.floor(Math.random() * cells.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * cells.length);
    } while (index1 === index2);
    const cell1 = cells[index1];
    const cell2 = cells[index2];
    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();
    const translateX1 = rect2.left - rect1.left;
    const translateY1 = rect2.top - rect1.top;
    const translateX2 = rect1.left - rect2.left;
    const translateY2 = rect1.top - rect2.top;
    cell1.style.transition = 'transform 1000ms';
    cell2.style.transition = 'transform 1000ms';
    cell1.style.transform = `translate(${translateX1}px, ${translateY1}px)`;
    cell2.style.transform = `translate(${translateX2}px, ${translateY2}px)`;
    setTimeout(() => {
        cell1.style.transition = '';
        cell2.style.transition = '';
        cell1.style.transform = '';
        cell2.style.transform = '';
        const cell1Clone = cell1.cloneNode(true);
        const cell2Clone = cell2.cloneNode(true);
        cell1.parentNode?.insertBefore(cell2Clone, cell1);
        cell2.parentNode?.insertBefore(cell1Clone, cell2);
        cell1.parentNode?.removeChild(cell1);
        cell2.parentNode?.removeChild(cell2);
    }, 1000);
}
