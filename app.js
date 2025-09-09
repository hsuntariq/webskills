let icon = document.querySelector(".bi-list");
let sidebar = document.querySelector(".sidebar");
let underlay = document.querySelector(".underlay");

icon.addEventListener("click", () => {
  sidebar.style.transform = "translateX(0)";
  underlay.style.visibility = "visible";
});

underlay.addEventListener("click", () => {
  sidebar.style.transform = "translateX(-100%)";
  underlay.style.visibility = "hidden";
});

const searchInput = document.querySelector(
  'input[placeholder="Search tutorials"]'
);

// ✅ get the correct list (not the sidebar one)
const allLists = document.querySelectorAll(".list-unstyled");
let chapterList;
allLists.forEach((list) => {
  if (!list.closest(".sidebar")) {
    chapterList = list;
  }
});

searchInput.addEventListener("keyup", function () {
  const filter = this.value.toLowerCase();
  const items = chapterList.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    const link = items[i].getElementsByTagName("a")[0];
    const text = link.textContent || link.innerText;

    if (text.toLowerCase().includes(filter)) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
});
