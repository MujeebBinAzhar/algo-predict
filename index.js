(function () {
  var vipMembersTarget = document.getElementById("vipMembersCount");
  if (vipMembersTarget) {
    fetch("https://r.jina.ai/https://t.me/+evoy32KbvXIwOWJh")
      .then((response) => response.text())
      .then((text) => {
        var match = text.match(/(\d[\d\s]*)\s+members/i);
        if (match && match[1]) {
          var cleaned = match[1].replace(/\s+/g, " ").trim();
          vipMembersTarget.textContent = cleaned + "+";
        }
      })
      .catch(() => {
        vipMembersTarget.textContent = "1 200+";
      });
  }

  var modal = document.getElementsByClassName("custom-modal")[0];
  var predict = document.getElementsByClassName("predict")[0];
  var span = document.getElementsByClassName("close")[0];
  var activate = document.getElementsByClassName("activate")[0];
  var admin = document.querySelector(".admin");
  var mobileAdmin = document.querySelector(".mobile-admin");
  var notificationText =
    document.getElementsByClassName("notification-text")[0];
  var consoleDiv = document.querySelector(".console");
  var licenseNumber = document.getElementsByClassName("license-number")[0];
  var casinoName = document.getElementsByClassName("casino-name")[0];
  var contentBottom = document.getElementsByClassName("content-bottom")[0];

  var licenseKey = "B7H8I-O5P3V-B3VW2";
  var clickCount = 0;

  notificationText.innerHTML =
    "Лицензът за достъп е въведен успешно! Казино: Betano.bg | Изтича след: 13h21min!";
  casinoName.innerHTML = "Casino Client: Betano.bg";
  licenseNumber.innerHTML = "Licence Number: B7H8I-O5P3V-B3VW2";

  // First popup settings
  var prediction1 = { start: 0, end: 2.0, duration: 1000 };
  var prediction2 = { start: 1.0, end: 3.5, duration: 1000 };

  // Array of messages with predefined colors
  const messagesWithColors = [
    { message: "Hash ID = os92md9da81v", color: "white" },
    { message: "Loading data...", color: "white" },
    { message: "Initializing components...", color: "white" },
    { message: "Processing user client...", color: "white" },
    { message: "Decrypting SHA-256..", color: "white" },
    { message: "Fetching Results...", color: "white" },
    { message: "Connecting to GP-1-server...", color: "white" },
    { message: "Displaying Results...", color: "white" },
    { message: "Completed the operation successfully.", color: "green" },
  ];

  let currentMessageIndex = 0;

  const counterAnim = (qSelector, start, end, duration) => {
    const target = document.querySelector(qSelector);
    const messageInterval = duration / messagesWithColors.length; // Time interval per message
    let startTimestamp = null;
    let lastMessageTime = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
      const currentValue = (progress * (end - start) + start).toFixed(2);

      // Update the displayed number
      target.innerText = currentValue;

      // Display messages at intervals
      if (
        elapsed >= lastMessageTime + messageInterval &&
        currentMessageIndex < messagesWithColors.length
      ) {
        const message = messagesWithColors[currentMessageIndex];
        updateConsole(message.message, message.color);
        currentMessageIndex++;
        lastMessageTime += messageInterval;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure the final value matches the target exactly
        target.innerText = end.toFixed(2);
        updateConsole("Processing completed.", "green");
      }
    };

    window.requestAnimationFrame(step);
  };

  const updateConsole = (message, color) => {
    const p = document.createElement("p");
    p.textContent = message;
    p.style.color = color; // Use the color associated with the message
    consoleDiv.appendChild(p);

    // Keep only the last 5 messages in the console
    const messages = consoleDiv.querySelectorAll("p");
    if (messages.length > 5) {
      consoleDiv.removeChild(messages[0]);
    }

    // Scroll to the bottom for the latest messages
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  };

  activate.onclick = function () {
    var passInput = document.getElementsByClassName("pass")[0].value;
    if (passInput === licenseKey) {
      modal.style.display = "block";
      contentBottom.classList.remove("d-none");
      document.getElementsByClassName("pass")[0].classList.add("d-none");
      this.classList.add("d-none");
      document
        .getElementsByClassName("telegram-hide")[0]
        .classList.add("d-none");
      document.getElementsByClassName("notification-text")[0].style.display =
        "block";

      setTimeout(() => {
        document.getElementsByClassName("notification-text")[0].style.display =
          "none";
      }, 2000);
    } else {
      alert("Invalid access license!");
    }
  };

  predict.onclick = function () {
    var passInput = document.getElementsByClassName("pass")[0].value;
    document.getElementsByClassName("pass")[0].classList.add("d-none");

    clickCount++;
    consoleDiv.innerHTML = "<p class='m-0'>Console Output:</p>";
    currentMessageIndex = 0; // Reset message index for each prediction

    if (clickCount === 1) {
      counterAnim(
        "#prediction",
        prediction1.start,
        prediction1.end,
        prediction1.duration
      );
    } else if (clickCount === 2) {
      counterAnim(
        "#prediction",
        prediction2.start,
        prediction2.end,
        prediction2.duration
      );
      clickCount = 0; // Reset after the second click
    }
  };

  span.onclick = function () {
    modal.style.display = "none";
    contentBottom.classList.add("d-none");
    activate.classList.remove("d-none");
    document.getElementsByClassName("pass")[0].classList.remove("d-none");
    document.querySelector("#prediction").innerHTML = 0;
  };

  // Close modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  admin.onclick = function () {
    alert("Вие нямате достъп до тази страница!!");
  };

  mobileAdmin.onclick = function () {
    alert("Вие нямате достъп до тази страница!!");
  };
})();
