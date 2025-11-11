const checkbox = document.getElementById("checkbox");

      // Check saved theme on load
      if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        checkbox.checked = true;
      }

      // Handle toggle
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          document.body.classList.add("light-mode");
          localStorage.setItem("theme", "light");
        } else {
          document.body.classList.remove("light-mode");
          localStorage.setItem("theme", "dark");
        }
      });