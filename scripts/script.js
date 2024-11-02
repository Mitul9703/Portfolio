document.addEventListener("DOMContentLoaded", () => {
  function createProjectSections(projects) {
    const container = document.querySelector(".projects-container");

    projects.forEach((project) => {
      // Create section
      const section = document.createElement("section");
      section.className = "project-section mb-5";

      // Main wrapper div
      const mainDiv = document.createElement("div");
      mainDiv.className = "d-flex flex-lg-row flex-column align-items-center";

      // Carousel container div
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container col-lg-6";

      const carouselId = `carousel-${project.name.replace(/\s+/g, "-")}`;
      const carousel = document.createElement("div");
      carousel.id = carouselId;
      carousel.className = "carousel slide";
      carousel.setAttribute("data-bs-ride", "carousel");

      const carouselInner = document.createElement("div");
      carouselInner.className = "carousel-inner";

      // Carousel indicators
      const indicators = document.createElement("div");
      indicators.className = "carousel-indicators";

      project.images.forEach((image, index) => {
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", `#${carouselId}`);
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.className = index === 0 ? "active" : "";
        indicators.appendChild(indicator);

        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;
        const carouselInnerItem = document.createElement("div");
        carouselInnerItem.className = `d-flex justify-content-center`;
        const img = document.createElement("img");
        img.src = image;
        img.className = "d-block w-100 align-middle";
        img.alt = `Image ${index + 1} for ${project.name}`;
        carouselInnerItem.appendChild(img);
        carouselItem.appendChild(carouselInnerItem);
        carouselInner.appendChild(carouselItem);
      });

      if (project.video) {
        const videoIndex = project.images.length;
        const videoIndicator = document.createElement("button");
        videoIndicator.type = "button";
        videoIndicator.setAttribute("data-bs-target", `#${carouselId}`);
        videoIndicator.setAttribute("data-bs-slide-to", videoIndex);
        indicators.appendChild(videoIndicator);

        const videoItem = document.createElement("div");
        videoItem.className = "carousel-item";
        const video = document.createElement("video");
        video.src = project.video;
        video.className = "d-block w-100";
        video.controls = true;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;

        const carouselInnerItem = document.createElement("div");
        carouselInnerItem.className = `d-flex justify-content-center`;
        carouselInnerItem.appendChild(video);
        videoItem.appendChild(carouselInnerItem);
        carouselInner.appendChild(videoItem);
      }

      // Append elements to carousel
      carousel.appendChild(carouselInner);
      //   carousel.appendChild(indicators);
      carouselContainer.appendChild(carousel);

      // Add navigation buttons
      const prevButton = document.createElement("button");
      prevButton.className = "carousel-control-prev";
      prevButton.type = "button";
      prevButton.setAttribute("data-bs-target", `#${carouselId}`);
      prevButton.setAttribute("data-bs-slide", "prev");
      prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;
      carousel.appendChild(prevButton);

      const nextButton = document.createElement("button");
      nextButton.className = "carousel-control-next";
      nextButton.type = "button";
      nextButton.setAttribute("data-bs-target", `#${carouselId}`);
      nextButton.setAttribute("data-bs-slide", "next");
      nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;
      carousel.appendChild(nextButton);

      // Project information container
      const projectContent = document.createElement("div");
      projectContent.className = "project-content col-lg-6 p-4";

      const title = document.createElement("h2");
      title.className = "project-title";
      title.innerText = project.name;

      const skillsHeader = document.createElement("h5");
      skillsHeader.style.paddingTop = "10px";
      skillsHeader.innerText = "Skills";

      const skillsList = document.createElement("ul");
      skillsList.className = "list-inline";
      project.skills.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.className = "list-inline-item badge bg-primary mx-1";
        skillItem.innerText = skill;
        skillsList.appendChild(skillItem);
      });

      const descriptionHeader = document.createElement("h5");
      descriptionHeader.innerText = "Project Description";

      const descriptionList = document.createElement("ul");
      project.description.forEach((point) => {
        const pointItem = document.createElement("li");
        pointItem.innerText = point;
        descriptionList.appendChild(pointItem);
      });

      const linksHeader = document.createElement("h5");
      linksHeader.innerText = "Links";

      const linksList = document.createElement("ul");
      linksList.className = "list-unstyled";

      if (project.presentationLink) {
        const presentationLink = document.createElement("li");
        presentationLink.innerHTML = `<a href="${project.presentationLink}" target="_blank" class="link-primary">Project Presentation</a>`;
        linksList.appendChild(presentationLink);
      }

      if (project.demoLink) {
        const demoLink = document.createElement("li");
        demoLink.innerHTML = `<a href="${project.demoLink}" target="_blank" class="link-primary">Project Demo</a>`;
        linksList.appendChild(demoLink);
      }

      projectContent.appendChild(title);
      projectContent.appendChild(skillsHeader);
      projectContent.appendChild(skillsList);
      projectContent.appendChild(descriptionHeader);
      projectContent.appendChild(descriptionList);
      projectContent.appendChild(linksHeader);
      projectContent.appendChild(linksList);

      // Append both containers to the main div
      mainDiv.appendChild(carouselContainer);
      mainDiv.appendChild(projectContent);
      section.appendChild(mainDiv);
      container.appendChild(section);
    });
  }

  // Fetch data from JSON and generate sections
  fetch("./data/projects.json")
    .then((response) => response.json())
    .then((projects) => createProjectSections(projects))
    .catch((error) => console.error("Error loading projects:", error));
});
