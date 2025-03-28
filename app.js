function loadNavbar() {
    const navbar = document.querySelector(".navbar");
    fetch("../components/navbar.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            navbar.innerHTML = data;
            navbar.classList.add("loaded");
            initializeMenuBtn();
        })
        .catch((error) => console.error("Error loading navbar:", error));
}

function loadSidebar() {
    const sidebar = document.querySelector(".sidebar");
    fetch("../components/sidebar.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            sidebar.innerHTML = data;
            sidebar.classList.add("loaded");
            sidebar.style.display = "block";
            initializeMenuBtn();
        })
        .catch((error) => console.error("Error loading sidebar:", error));
}

function initializeMenuBtn() {
    const menuBtns = document.querySelectorAll(".all");
    const sidebar = document.querySelector(".sidebar");
    let sidebarVisible = false; 

    const toggleSidebar = () => {
        console.log("Menu button was clicked");
        if (sidebarVisible) {
            sidebar.style.display = "none";
            sidebarVisible = false;
        } else {
            if (!sidebar.classList.contains("loaded")) {
                loadSidebar(); 
            } else {
                sidebar.style.display = "block"; 
            }
            sidebarVisible = true;
        }
    };

    menuBtns.forEach((btn) => {
        btn.addEventListener("click", toggleSidebar);
    });
}

function loadfooter()
{
    const footer=document.querySelector(".Foot-container");
    fetch("../components/footer.html")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then((data) => {
        footer.innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
}
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadfooter();
});
document.getElementById("scrollUp").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling effect
    });
});