  // get the "year" param from the page URL
      var urlString = window.location.search;
      var urlParams = new URLSearchParams(urlString);
      var year = urlParams.get("year");

      // if a year exists, then mark that link as active
      if (year) {
        var activeLink = document.getElementById("y" + year);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
