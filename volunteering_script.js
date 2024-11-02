document.addEventListener("DOMContentLoaded", () => {
  function createVolunteeringSections(volunteerings) {
    const container = document.querySelector(".volunteering-container");

    volunteerings.forEach((volunteering) => {
      const section = document.createElement("section");
      section.className =
        "volunteering-section d-flex flex-lg-row flex-column align-items-center mb-5";

      // Left side: Title and Conference/Journal
      const leftSide = document.createElement("div");
      leftSide.className = "col-lg-6 p-4";

      const title = document.createElement("h2");
      title.className = "volunteering-title";
      title.innerText = volunteering.title;

      const organisation = document.createElement("p");
      organisation.className = "text-muted fst-italic";
      organisation.innerText = volunteering.organisation;

      const date = document.createElement("p");
      date.className = "text-muted fst-italic";
      date.innerText = volunteering.date;

      leftSide.appendChild(title);
      leftSide.appendChild(organisation);
      leftSide.appendChild(date);

      // Right side: Description
      const rightSide = document.createElement("div");
      rightSide.className = "col-lg-6 p-4";

      const descriptionList = document.createElement("ul");
      volunteering.description.forEach((point) => {
        const pointItem = document.createElement("li");
        pointItem.innerText = point;
        descriptionList.appendChild(pointItem);
      });

      rightSide.appendChild(descriptionList);

      // Append left and right sides to section
      section.appendChild(leftSide);
      section.appendChild(rightSide);

      // Add section to container
      container.appendChild(section);
    });
  }

  // Fetch data from JSON and generate sections
  fetch("volunteering.json")
    .then((response) => response.json())
    .then((volunteerings) => createVolunteeringSections(volunteerings))
    .catch((error) => console.error("Error loading volunteerings:", error));
});
