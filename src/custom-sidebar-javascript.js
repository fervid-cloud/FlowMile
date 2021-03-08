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
    // const toggleButtons = document.querySelectorAll(toggleTriggerButtonIdentifier);
    // gets all elements i.e it works even if the element display style is set to none for some of the buttons according to screen requirement
    // console.log(toggleButtons);
    // seemed too much inefficient update: it is actually better in case user going back to dashboard with the sidebar open, so new dom element will be created, so it will become a bug as event listener were defined for previous version/reference same element
    document.addEventListener('click', setupClickHandlers);
/*     for (let i = 0; i < toggleButtons.length; ++i) {
        toggleButtons[i].addEventListener('click', handleClick);
    } */
});


/* function handleClick(event) {
    try {
        // note that target is not taken because that will be the actual element on click happened, but
        // currentTarget is the element through which event is propagating due to event bubbling(by default even listnere is activated for that)

        const { currentTarget: reqTarget } = event;
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
} */


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