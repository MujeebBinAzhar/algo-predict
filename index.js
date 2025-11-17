(function () {
  // VIP Members Count (for landing page)
  var vipMembersTarget = document.getElementById("vipMembersCount");
  if (vipMembersTarget) {
    fetch("https://r.jina.ai/https://t.me/+evoy32KbvXIwOWJh")
      .then((response) => response.text())
      .then((text) => {
        var match = text.match(/(\d[\d\s]*)\s+member(s)?/i);
        if (match && match[1]) {
          var cleaned = match[1].replace(/\s+/g, " ").trim();
          vipMembersTarget.textContent = cleaned + "+";
        }
      })
      .catch(() => {
        vipMembersTarget.textContent = "1 200+";
      });
  }

  // Software Page Logic
  var activateBtn = document.getElementById("activateBtn");
  var predictBtn = document.getElementById("predictBtn");
  var accessCodeInput = document.getElementById("accessCode");
  var siteLinkInput = document.getElementById("siteLink");
  var errorMsg = document.querySelector(".error-msg");
  var planInfo = document.getElementById("planInfo");
  var planBadge = document.getElementById("planBadge");
  var planName = document.getElementById("planName");
  var licenseNumber = document.getElementById("licenseNumber");
  var casinoSite = document.getElementById("casinoSite");
  var accessTime = document.getElementById("accessTime");
  var casinoLimit = document.getElementById("casinoLimit");
  var predictionsCard = document.getElementById("predictionsCard");
  var consoleCard = document.getElementById("consoleCard");
  var consoleOutput = document.getElementById("consoleOutput");

  var licenseKeys = {
    trial: "TRIAL-289-2024",
    basic: "BASIC-329-2024",
    vip: "VIP-389-2024",
  };

  var planConfigs = {
    trial: {
      name: "AlgoPredict Trial",
      access: "6 часа",
      casinos: "1 казино / до 1 профил",
      color: "#ff6b6b",
    },
    basic: {
      name: "AlgoPredict Basic",
      access: "12 часа",
      casinos: "1 казино / до 2 профила",
      color: "#4ecdc4",
    },
    vip: {
      name: "AlgoPredict V.I.P",
      access: "24 часа",
      casinos: "Всички казина · неограничени профили",
      color: "#ffd93d",
    },
  };

  var predictions = [
    { start: 0, end: 1.85, duration: 1200 },
    { start: 0, end: 2.42, duration: 1200 },
    { start: 0, end: 3.15, duration: 1200 },
    { start: 0, end: 2.78, duration: 1200 },
  ];

  var currentPlan = null;
  var clickCount = 0;
  var currentMessageIndex = 0;
  var editCount = 0;
  var currentSiteLink = "";

  const messagesWithColors = [
    { message: "Hash ID = os92md9da81v", color: "white" },
    { message: "Зареждане на данни...", color: "white" },
    { message: "Инициализация на компоненти...", color: "white" },
    { message: "Обработка на клиент...", color: "white" },
    { message: "Декриптиране SHA-256..", color: "white" },
    { message: "Извличане на резултати...", color: "white" },
    { message: "Свързване с GP-1-сървър...", color: "white" },
    { message: "Показване на резултати...", color: "white" },
    { message: "Операцията завърши успешно.", color: "#4ade80" },
  ];

  const updateConsole = (message, color) => {
    if (!consoleOutput) return;
    const p = document.createElement("p");
    p.className = "console-line";
    p.textContent = message;
    p.style.color = color;
    consoleOutput.appendChild(p);

    const messages = consoleOutput.querySelectorAll(".console-line");
    if (messages.length > 8) {
      consoleOutput.removeChild(messages[0]);
    }

    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  };

  const counterAnim = (targetId, start, end, duration) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const messageInterval = duration / messagesWithColors.length;
    let startTimestamp = null;
    let lastMessageTime = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = (progress * (end - start) + start).toFixed(2);

      target.textContent = currentValue;

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
        target.textContent = end.toFixed(2);
        updateConsole("Обработката завърши.", "#4ade80");
      }
    };

    window.requestAnimationFrame(step);
  };

  if (activateBtn) {
    activateBtn.onclick = function () {
      var code = accessCodeInput ? accessCodeInput.value.trim() : "";
      var siteLink = siteLinkInput ? siteLinkInput.value.trim() : "";

      if (!siteLink) {
        if (errorMsg) {
          errorMsg.textContent = "Моля, въведете линк на сайта!";
          errorMsg.classList.remove("d-none");
        }
        return;
      }

      try {
        new URL(siteLink);
      } catch (e) {
        if (errorMsg) {
          errorMsg.textContent = "Моля, въведете валиден URL адрес!";
          errorMsg.classList.remove("d-none");
        }
        return;
      }

      var planType = null;
      if (code === licenseKeys.trial) {
        planType = "trial";
      } else if (code === licenseKeys.basic) {
        planType = "basic";
      } else if (code === licenseKeys.vip) {
        planType = "vip";
      }

      if (!planType) {
        if (errorMsg) {
          errorMsg.textContent = "Невалиден код за достъп!";
          errorMsg.classList.remove("d-none");
        }
        return;
      }

      currentPlan = planType;
      var config = planConfigs[planType];

      if (errorMsg) {
        errorMsg.classList.add("d-none");
      }

      if (planInfo) {
        planInfo.classList.remove("d-none");
        planBadge.style.background = config.color;
        planName.textContent = config.name;
        licenseNumber.textContent = code;
        casinoSite.textContent = siteLink;
        currentSiteLink = siteLink;
        accessTime.textContent = config.access;
        casinoLimit.textContent = config.casinos;

        // Show edit button for Basic and VIP plans
        var editSiteBtn = document.getElementById("editSiteBtn");
        if (editSiteBtn && (planType === "basic" || planType === "vip")) {
          editSiteBtn.classList.remove("d-none");
        }
      }

      if (predictionsCard) {
        predictionsCard.classList.remove("d-none");
      }
      if (consoleCard) {
        consoleCard.classList.remove("d-none");
      }

      if (accessCodeInput) accessCodeInput.disabled = true;
      if (siteLinkInput) siteLinkInput.disabled = true;
      this.disabled = true;
      this.textContent = "✓ Активиран";

      updateConsole("Лицензът е активиран успешно!", "#4ade80");
      updateConsole("Казино: " + siteLink, "white");
      updateConsole("План: " + config.name, "white");
      updateConsole("Готов за предвиждания...", "#4ade80");
    };
  }

  if (predictBtn) {
    predictBtn.onclick = function () {
      if (!currentPlan) {
        alert("Моля, активирайте код първо!");
        return;
      }

      clickCount++;
      currentMessageIndex = 0;

      if (consoleOutput) {
        consoleOutput.innerHTML =
          '<p class="console-line">Изход от конзолата:</p>';
      }

      // Cycle through predictions for single counter
      var predictionIndex = (clickCount - 1) % predictions.length;
      var prediction = predictions[predictionIndex];

      counterAnim(
        "prediction",
        prediction.start,
        prediction.end,
        prediction.duration
      );
    };
  }

  // Site link editing functionality
  var editSiteBtn = document.getElementById("editSiteBtn");
  var siteEditForm = document.getElementById("siteEditForm");
  var siteLinkEdit = document.getElementById("siteLinkEdit");
  var saveSiteBtn = document.getElementById("saveSiteBtn");
  var cancelSiteBtn = document.getElementById("cancelSiteBtn");
  var editInfo = document.getElementById("editInfo");

  if (editSiteBtn) {
    editSiteBtn.onclick = function () {
      if (!siteEditForm || !siteLinkEdit) return;

      // Check if user can still edit
      var canEdit = false;
      if (currentPlan === "vip") {
        canEdit = true; // Unlimited
      } else if (currentPlan === "basic" && editCount < 2) {
        canEdit = true; // Max 2 edits
      }

      if (!canEdit) {
        if (editInfo) {
          editInfo.textContent = "Достигнахте лимита за редактиране!";
          editInfo.style.color = "#ff5c5c";
        }
        return;
      }

      siteEditForm.classList.remove("d-none");
      siteLinkEdit.value = currentSiteLink;
      siteLinkEdit.focus();

      // Update edit info
      if (editInfo) {
        var remaining =
          currentPlan === "vip" ? "Неограничено" : 2 - editCount + " оставащи";
        editInfo.textContent = "Оставащи редактирания: " + remaining;
        editInfo.style.color = "rgba(255, 255, 255, 0.7)";
      }
    };
  }

  if (saveSiteBtn) {
    saveSiteBtn.onclick = function () {
      if (!siteLinkEdit || !siteEditForm) return;

      var newSiteLink = siteLinkEdit.value.trim();

      if (!newSiteLink) {
        if (editInfo) {
          editInfo.textContent = "Моля, въведете валиден URL адрес!";
          editInfo.style.color = "#ff5c5c";
        }
        return;
      }

      try {
        new URL(newSiteLink);
      } catch (e) {
        if (editInfo) {
          editInfo.textContent = "Моля, въведете валиден URL адрес!";
          editInfo.style.color = "#ff5c5c";
        }
        return;
      }

      // Update site link
      currentSiteLink = newSiteLink;
      if (casinoSite) {
        casinoSite.textContent = newSiteLink;
      }

      // Increment edit count
      editCount++;

      // Hide edit form
      siteEditForm.classList.add("d-none");

      // Update console
      updateConsole("Сайтът е обновен: " + newSiteLink, "#4ade80");

      // Check if user can still edit
      var canStillEdit = false;
      if (currentPlan === "vip") {
        canStillEdit = true;
      } else if (currentPlan === "basic" && editCount < 2) {
        canStillEdit = true;
      }

      if (!canStillEdit && editSiteBtn) {
        editSiteBtn.disabled = true;
        editSiteBtn.style.opacity = "0.5";
        editSiteBtn.textContent = "Лимит достигнат";
      }
    };
  }

  if (cancelSiteBtn) {
    cancelSiteBtn.onclick = function () {
      if (siteEditForm) {
        siteEditForm.classList.add("d-none");
      }
      if (siteLinkEdit) {
        siteLinkEdit.value = "";
      }
    };
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
  var licenseNumberOld = document.getElementsByClassName("license-number")[0];
  var casinoName = document.getElementsByClassName("casino-name")[0];
  var contentBottom = document.getElementsByClassName("content-bottom")[0];

  if (modal && predict && span && activate) {
    var licenseKey = "B7H8I-O5P3V-B3VW2";
    var clickCountOld = 0;

    var prediction1 = { start: 0, end: 2.0, duration: 1000 };
    var prediction2 = { start: 1.0, end: 3.5, duration: 1000 };

    const counterAnimOld = (qSelector, start, end, duration) => {
      const target = document.querySelector(qSelector);
      if (!target) return;
      const messageInterval = duration / messagesWithColors.length;
      let startTimestamp = null;
      let lastMessageTime = 0;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = (progress * (end - start) + start).toFixed(2);
        target.innerText = currentValue;

        if (
          elapsed >= lastMessageTime + messageInterval &&
          currentMessageIndex < messagesWithColors.length
        ) {
          const message = messagesWithColors[currentMessageIndex];
          updateConsoleOld(message.message, message.color);
          currentMessageIndex++;
          lastMessageTime += messageInterval;
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          target.innerText = end.toFixed(2);
          updateConsoleOld("Обработката завърши.", "#4ade80");
        }
      };

      window.requestAnimationFrame(step);
    };

    const updateConsoleOld = (message, color) => {
      if (!consoleDiv) return;
      const p = document.createElement("p");
      p.textContent = message;
      p.style.color = color;
      consoleDiv.appendChild(p);

      const messages = consoleDiv.querySelectorAll("p");
      if (messages.length > 5) {
        consoleDiv.removeChild(messages[0]);
      }
      consoleDiv.scrollTop = consoleDiv.scrollHeight;
    };

    activate.onclick = function () {
      var passInput = document.getElementsByClassName("pass")[0];
      if (!passInput) return;
      var passValue = passInput.value;
      if (passValue === licenseKey) {
        modal.style.display = "block";
        if (contentBottom) contentBottom.classList.remove("d-none");
        passInput.classList.add("d-none");
        this.classList.add("d-none");
        if (notificationText) {
          notificationText.style.display = "block";
          setTimeout(() => {
            notificationText.style.display = "none";
          }, 2000);
        }
      } else {
        alert("Невалиден код за достъп!");
      }
    };

    predict.onclick = function () {
      clickCountOld++;
      if (consoleDiv) {
        consoleDiv.innerHTML = "<p class='m-0'>Изход от конзолата:</p>";
      }
      currentMessageIndex = 0;

      if (clickCountOld === 1) {
        counterAnimOld(
          "#prediction",
          prediction1.start,
          prediction1.end,
          prediction1.duration
        );
      } else if (clickCountOld === 2) {
        counterAnimOld(
          "#prediction",
          prediction2.start,
          prediction2.end,
          prediction2.duration
        );
        clickCountOld = 0;
      }
    };

    if (span) {
      span.onclick = function () {
        modal.style.display = "none";
        if (contentBottom) contentBottom.classList.add("d-none");
        if (activate) activate.classList.remove("d-none");
        var passInput = document.getElementsByClassName("pass")[0];
        if (passInput) passInput.classList.remove("d-none");
        var predictionEl = document.querySelector("#prediction");
        if (predictionEl) predictionEl.innerHTML = 0;
      };
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  if (admin) {
    admin.onclick = function () {
      alert("Вие нямате достъп до тази страница!!");
    };
  }

  if (mobileAdmin) {
    mobileAdmin.onclick = function () {
      alert("Вие нямате достъп до тази страница!!");
    };
  }
})();
