document.addEventListener("DOMContentLoaded", () => {
  function createPublicationSections(publications) {
    const container = document.querySelector(".publications-container");

    publications.forEach((publication) => {
      const section = document.createElement("section");
      section.className =
        "publication-section d-flex flex-lg-row flex-column align-items-center mb-5";

      // Left side: Title and Conference/Journal
      const leftSide = document.createElement("div");
      leftSide.className = "col-lg-6 p-4";

      const title = document.createElement("h2");
      title.className = "publication-title";
      title.innerText = publication.title;

      const conference = document.createElement("p");
      conference.className = "text-muted fst-italic";
      conference.innerText = publication.conference;

      leftSide.appendChild(title);
      leftSide.appendChild(conference);

      // Right side: Description
      const rightSide = document.createElement("div");
      rightSide.className = "col-lg-6 p-4";

      const descriptionList = document.createElement("ul");
      publication.description.forEach((point) => {
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
  fetch("publications.json")
    .then((response) => response.json())
    .then((publications) => createPublicationSections(publications))
    .catch((error) => console.error("Error loading publications:", error));
});
