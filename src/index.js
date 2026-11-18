const navtoggleButton = document.getElementById("navbarOpenClose");
const navBar = document.getElementById("navBar");
let navBarOpen = false;

const darkLightModeButton = document.getElementById("darkLightMode");
const sunIcon = document.getElementById("sun");
const moonIcon = document.getElementById("moon");
let isDarkMode = true;

const messageBoxTemplate = document.querySelector("#messageBoxTemplate");
const messageBoxTemplateCat = document.querySelector("#messageBoxTemplateCat");

const msgInput = document.querySelector("#msgInput");
const msgSendButton = document.querySelector(".msgSend");

const chatArea = document.querySelector(".chatArea");

const nanaSidebar = document.getElementById("nanaSidebar");
const uniSidebar = document.getElementById("uniSidebar");
const oatmealSidebar = document.getElementById("oatmealSidebar");

const nanaMessages = [];
const uniMessages = [];
const oatmealMessages = [];

let selectedCatAvatarPath = "assets/cats/nana.jpg";

nanaSidebar.addEventListener("click", () => {
    if(selectedCatAvatarPath !== "assets/cats/nana.jpg") {
        selectedCatAvatarPath = "assets/cats/nana.jpg";
        loadMessages(nanaMessages);
    }
});

uniSidebar.addEventListener("click", () => {
    if(selectedCatAvatarPath !== "assets/cats/uni.jpg") {
        selectedCatAvatarPath = "assets/cats/uni.jpg";
        loadMessages(uniMessages);
    }
});

oatmealSidebar.addEventListener("click", () => {
    if(selectedCatAvatarPath !== "assets/cats/oatmeal.jpg") {
        selectedCatAvatarPath = "assets/cats/oatmeal.jpg";
        loadMessages(oatmealMessages);
    }
});

msgInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (sendMessage()) {
            msgInput.disabled = true;

            setTimeout(() => {
                sendMessage(true);
                msgInput.disabled = false;
                msgInput.focus();
            }, 1000);
        }
    }
});

msgSendButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (sendMessage()) {
        msgInput.disabled = true;

        setTimeout(() => {
            sendMessage(true);
            msgInput.disabled = false;
            msgInput.focus();
        }, 1000);
    }
});

function sendMessage(isCat = false) {
    const messageText = isCat ? createCatMessage() : msgInput.value;
    if (!isCat && messageText.trim() === "") {
        return false;
    }

    if(selectedCatAvatarPath === "assets/cats/nana.jpg") {
        nanaMessages.push(messageText);
    }
    if(selectedCatAvatarPath === "assets/cats/uni.jpg") {
        uniMessages.push(messageText);
    }
    if(selectedCatAvatarPath === "assets/cats/oatmeal.jpg") {
        oatmealMessages.push(messageText);
    }
    
    const messageBox = makeMessage(messageText, isCat);
    chatArea.appendChild(messageBox);

    if (!isCat) {
        msgInput.value = "";
    }

    chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: "smooth"
    });

    document.getElementById("startChatting").classList.add("hide");

    return true;
}

navtoggleButton.addEventListener("click", () => {
    navBar.classList.toggle("opened");
    navBarOpen = !navBarOpen;
});

darkLightModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    sunIcon.classList.toggle("hide");
    moonIcon.classList.toggle("hide");
    isDarkMode = !isDarkMode;
});

function makeMessage(text, isCat = false) {
    const template = isCat ? messageBoxTemplateCat : messageBoxTemplate;
    const clone = template.content.cloneNode(true);
    const messageText = clone.querySelector(".messageText");
    if (isCat) {
        const avatar = clone.querySelector(".pfp");
        avatar.src = selectedCatAvatarPath;
    }
    messageText.textContent = text;
    return clone;
}

function createCatMessage() {
    const words = ["meow", "purr", "nya", "mrrp", "prrrrr", "nyaaa"]; 
    const endings = ["!", ".", "...", "!!!", "?", "!?"];

    const wordCount = Math.floor(Math.random() * 3) + 1;

    let message = words[Math.floor(Math.random() * words.length)];

    const ending = endings[Math.floor(Math.random() * endings.length)];

    return `${message.trim()}${ending}`;
}

function loadMessages(messages) {
    chatArea.innerHTML = "";

    const startChatting = document.getElementById("startChatting");
    if (messages.length === 0) {
        startChatting.classList.remove("hide");
    }
    else {
        startChatting.classList.add("hide");
    }

    messages.forEach((message, index) => {
        const isCat = index % 2 === 1;
        chatArea.appendChild(makeMessage(message, isCat));
    });

    chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: "smooth"
    });
}
