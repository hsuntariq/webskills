// ✅ Sidebar toggle
const icon = document.querySelector(".bi-list");
const sidebar = document.querySelector(".sidebar");
const underlay = document.querySelector(".underlay");

icon.addEventListener("click", () => {
  sidebar.style.transform = "translateX(0)";
  underlay.style.visibility = "visible";
});

underlay.addEventListener("click", () => {
  sidebar.style.transform = "translateX(-100%)";
  underlay.style.visibility = "hidden";
});

// ✅ Search
const searchInput = document.querySelector(
  'input[placeholder="Search tutorials"]'
);

if (searchInput) {
  // ✅ get the list (first .list-unstyled found)
  const allLists = document.querySelectorAll(".list-unstyled");
  let chapterList = allLists.length > 0 ? allLists[0] : null;

  // ✅ create a results container under the search input
  let resultsContainer = document.createElement("div");
  resultsContainer.id = "search-results";
  resultsContainer.style.position = "absolute";
  resultsContainer.style.background = "#fff";
  resultsContainer.style.border = "1px solid #ccc";
  resultsContainer.style.width = searchInput.offsetWidth + "px";
  resultsContainer.style.maxHeight = "250px";
  resultsContainer.style.overflowY = "auto";
  resultsContainer.style.zIndex = "1000";
  resultsContainer.style.display = "none";
  searchInput.parentNode.appendChild(resultsContainer);

  // ✅ handle keyup search
  searchInput.addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();

    // clear old results
    resultsContainer.innerHTML = "";

    if (filter.trim() === "" || !chapterList) {
      resultsContainer.style.display = "none";
      return;
    }

    const items = chapterList.getElementsByTagName("li");
    let found = 0;

    for (let i = 0; i < items.length; i++) {
      const link = items[i].getElementsByTagName("a")[0];
      const text = link.textContent || link.innerText;

      if (text.toLowerCase().includes(filter)) {
        // ✅ show item in results container
        let resultItem = document.createElement("div");
        resultItem.textContent = text;
        resultItem.style.padding = "8px";
        resultItem.style.cursor = "pointer";
        resultItem.addEventListener("click", () => {
          window.location.href = link.href;
        });

        // hover effect
        resultItem.addEventListener("mouseover", () => {
          resultItem.style.background = "#f0f0f0";
        });
        resultItem.addEventListener("mouseout", () => {
          resultItem.style.background = "#fff";
        });

        resultsContainer.appendChild(resultItem);
        found++;
      }
    }

    resultsContainer.style.display = found > 0 ? "block" : "none";
  });

  // ✅ hide results if clicked outside
  document.addEventListener("click", (e) => {
    if (!resultsContainer.contains(e.target) && e.target !== searchInput) {
      resultsContainer.style.display = "none";
    }
  });
}
