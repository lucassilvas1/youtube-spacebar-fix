// ==UserScript==
// @name         Youtube Spacebar resume/pause fix
// @namespace    https://github.com/lucassilvas1/youtube-spacebar-fix
// @description  Fixes Spacebar not resuming/pausing YouTube videos after alt-tabbing
// @version      1.0
// @author       lucassilvas1
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  // Check if current page is a video page
  if (!new URL(location.href).searchParams.get("v")) return;

  let video = null;

  addListener();

  // Get video element and cache it once it's found
  function getVideo() {
    if (video) return video;
    video = document.querySelector(".video-stream.html5-main-video");
    if (!video) console.error("Could not find video element");
    return video;
  }

  // Ignore keyboard events if they came from an input
  function isInput(element) {
    if (element.getAttribute("contenteditable") === "true") {
      return true;
    }

    if (
      element.tagName.toLowerCase() === "input" ||
      element.tagName.toLowerCase() === "textarea" ||
      element.tagName.toLowerCase() === "select"
    ) {
      return true;
    }

    return false;
  }

  function isPlaying() {
    return getVideo().currentTime && !getVideo().paused && !getVideo().ended;
  }

  function addListener() {
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key !== " " || isInput(document.activeElement)) return;

        if (isPlaying()) getVideo().pause();
        else getVideo().play();
      },
      { capture: true }
    );
  }
})();
