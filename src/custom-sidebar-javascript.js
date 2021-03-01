// console.log("Hi there");
/**
 * implementation to find the ancestor element of our choice to which we want to delegate the handling of the any event
 * @param reqSelector
 * @returns {Element}
 */
Element.prototype.customMatches = function (reqSelector) {

    let curElement = this;

    while (curElement !== null) {
        if (curElement.matches(reqSelector)) {
            return curElement;
        }
        curElement = curElement.parentElement;
    }
    return curElement;
}



const smallerThanLargeSideBarShow = "sidebar-show";
const largerSidebarShow = "sidebar-lg-show";
const toggleTriggerButtonIdentifier = ".custom-side-nav-toggler";
const toggleButtonForLargeScreen = "d-lg-block";
const toggleButtonForSmallScreen = "d-lg-none";
let bodyElement;

document.addEventListener("DOMContentLoaded", async function () {
    bodyElement = document.querySelector("body");
    bodyElement.classList.add(largerSidebarShow);
    document.addEventListener('click', setupClickHandlers);
});

function setupClickHandlers(event) {

        try {
            const { target } = event;
            let reqTarget = target.customMatches(toggleTriggerButtonIdentifier);

            if (!reqTarget) {
                return;
            }

            if (bodyElement.classList.contains(smallerThanLargeSideBarShow)) {
                bodyElement.classList.remove(smallerThanLargeSideBarShow)
                bodyElement.classList.remove(largerSidebarShow);
                return;
            }

            if (reqTarget.classList.contains(toggleButtonForLargeScreen)) {
                bodyElement.classList.toggle(largerSidebarShow);
            } else if (reqTarget.classList.contains(toggleButtonForSmallScreen)) {
                bodyElement.classList.toggle(smallerThanLargeSideBarShow);
            }

        } catch (ex) {
            console.log("error was : ", ex);
        }
}