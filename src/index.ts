import {
  FunText,
  type AnimationId,
  type InputAnimation,
  type InputOptions,
} from "funtext";

// Funtext latest version
const apiUrl = "https://registry.npmjs.org/funtext/latest";

// Menu control
const maxMobile = 768;
const sliderWidth = "200px";
const sidebar = document.getElementById("sidebar");
const close = document.getElementById("close");
const background = document.getElementById("background");

let isMobile = window.innerWidth <= maxMobile;
let isOpen = false;

function updateMenu() {
  if (close) {
    if (isMobile && isOpen) {
      close.style.setProperty("display", "block");
    } else {
      close.style.setProperty("display", "none");
    }
  }

  if (sidebar) {
    if (isOpen) {
      sidebar.style.setProperty("--sidebar-slide", sliderWidth);
    } else {
      sidebar.style.setProperty("--sidebar-slide", "0px");
    }
  }

  if (background) {
    if (isMobile && isOpen) {
      background.style.setProperty("display", "block");
    } else {
      background.style.setProperty("display", "none");
    }
  }
}
updateMenu();

window.addEventListener("resize", () => {
  const wasMobile = isMobile;
  isMobile = window.innerWidth <= maxMobile;

  if (wasMobile !== isMobile) {
    updateMenu();
  }
});

function openMenu() {
  isOpen = true;
  updateMenu();
}
(window as any).openMenu = openMenu;

function closeMenu() {
  isOpen = false;
  updateMenu();
}
(window as any).closeMenu = closeMenu;

// Use the fetch function to make a GET request to the URL
fetch(apiUrl)
  .then((response) => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON in the response
    return response.json();
  })
  .then((data) => {
    // Get container
    const versionContainer = document.getElementById("funtext_version");

    // Display latest version
    if (versionContainer) {
      versionContainer.innerText = "v" + data.version;
    }
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  });

// Dark mode support
FunText.options = {
  accessibility: {
    prefersColorScheme: true,
  },
  css: {
    text: "color: rgb(19, 19, 25);",
  },
  altcss: {
    text: "color: rgb(228, 228, 240);",
  },
};

// Page title
const funtext_title_container = document.getElementById("funtext");
const funtext_title_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 1.05,
    steps: ["rgb(47, 212, 47)", "rgb(25, 128, 25)", "rgb(47, 212, 47)"],
    iteration: "infinite",
    sync: {
      location: 0,
      duration: 10,
    },
    offset: 0.25,
  },
];
if (funtext_title_container) {
  const funtext_title = new FunText(
    funtext_title_container,
    funtext_title_animations
  );
  funtext_title.mount();
}

// Setup example
const fun_setup_container = document.getElementById("fun_setup");
const fun_setup_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "translate",
    duration: 1.5,
    steps: "0 10px",
    iteration: "infinite",
    direction: "alternate",
  },
  {
    scope: "letter",
    property: "color",
    duration: 9,
    steps: ["", "yellow", "orange", "red", "lime", "green", "blue", "purple"],
    iteration: "infinite",
  },
];
if (fun_setup_container) {
  const fun_setup = new FunText(fun_setup_container, fun_setup_animations);
  fun_setup.mount()?.pauseAll();

  const play_button = document.getElementById("fun_setup_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_setup.playAll();
    });
  }

  const pause_button = document.getElementById("fun_setup_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_setup.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_setup_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_setup.resetAll();
    });
  }
}

// Scope Build-in example
const fun_scope_buildin_word_container = document.getElementById(
  "fun_scope_buildin_word"
);
const fun_scope_buildin_word_animations: InputAnimation[] = [
  {
    scope: "word",
    property: "translate",
    duration: 2,
    steps: "0 10px",
    iteration: "infinite",
    direction: "alternate",
    offset: 0.5,
  },
];

const fun_scope_buildin_letter_container = document.getElementById(
  "fun_scope_buildin_letter"
);
const fun_scope_buildin_letter_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "translate",
    duration: 1.5,
    steps: "0 10px",
    iteration: "infinite",
    direction: "alternate",
  },
];

if (fun_scope_buildin_word_container && fun_scope_buildin_letter_container) {
  const fun_scope_buildin_word = new FunText(
    fun_scope_buildin_word_container,
    fun_scope_buildin_word_animations
  );
  fun_scope_buildin_word.mount()?.pauseAll();

  const fun_scope_buildin_letter = new FunText(
    fun_scope_buildin_letter_container,
    fun_scope_buildin_letter_animations
  );
  fun_scope_buildin_letter.mount()?.pauseAll();

  const play_button = document.getElementById("fun_scope_buildin_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_scope_buildin_word.playAll();
      fun_scope_buildin_letter.playAll();
    });
  }

  const pause_button = document.getElementById("fun_scope_buildin_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_scope_buildin_word.pauseAll();
      fun_scope_buildin_letter.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_scope_buildin_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_scope_buildin_word.resetAll();
      fun_scope_buildin_letter.resetAll();
    });
  }
}

// Scope Custom example
const fun_scope_custom_container = document.getElementById("fun_scope_custom");
const fun_scope_custom_animations: InputAnimation[] = [
  {
    scope: {
      split: "A",
      priority: 0,
    },
    property: "translate",
    duration: 1,
    steps: {
      0.1: "0 -5px",
      100: "0 5px",
    },
    iteration: "infinite",
    direction: "alternate",
    offset: 1,
  },
  {
    scope: {
      split: "B",
      priority: 4,
    },
    property: "color",
    duration: 1,
    steps: "red",
    iteration: "infinite",
    direction: "alternate",
    offset: 1,
  },
];
if (fun_scope_custom_container) {
  const fun_scope_custom = new FunText(
    fun_scope_custom_container,
    fun_scope_custom_animations
  );
  fun_scope_custom.mount()?.pauseAll();

  const play_button = document.getElementById("fun_scope_custom_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_scope_custom.playAll();
    });
  }

  const pause_button = document.getElementById("fun_scope_custom_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_scope_custom.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_scope_custom_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_scope_custom.resetAll();
    });
  }
}

// Steps example
const fun_steps_string_container = document.getElementById("fun_steps_string");
const fun_steps_string_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 10,
    steps: "red",
    fill: "forwards",
  },
];

const fun_steps_array_container = document.getElementById("fun_steps_array");
const fun_steps_array_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 10,
    steps: ["", "blue", "green", "yellow", "red"],
    fill: "forwards",
  },
];

const fun_steps_object_container = document.getElementById("fun_steps_object");
const fun_steps_object_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 10,
    steps: {
      70: "blue",
      85: "green",
      95: "yellow",
      100: "red",
    },
    fill: "forwards",
  },
];

if (
  fun_steps_string_container &&
  fun_steps_array_container &&
  fun_steps_object_container
) {
  const fun_steps_string = new FunText(
    fun_steps_string_container,
    fun_steps_string_animations
  );
  fun_steps_string.mount()?.pauseAll();

  const fun_steps_array = new FunText(
    fun_steps_array_container,
    fun_steps_array_animations
  );
  fun_steps_array.mount()?.pauseAll();
  const fun_steps_object = new FunText(
    fun_steps_object_container,
    fun_steps_object_animations
  );
  fun_steps_object.mount()?.pauseAll();

  const play_button = document.getElementById("fun_steps_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_steps_string.playAll();
      fun_steps_array.playAll();
      fun_steps_object.playAll();
    });
  }

  const pause_button = document.getElementById("fun_steps_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_steps_string.pauseAll();
      fun_steps_array.pauseAll();
      fun_steps_object.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_steps_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_steps_string.resetAll();
      fun_steps_array.resetAll();
      fun_steps_object.resetAll();
    });
  }
}

// Offset example
const fun_animations_offset_none_container = document.getElementById(
  "fun_animations_offset_none"
);
const fun_animations_offset_none_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "opacity",
    duration: 5,
    steps: "0",
    fill: "forwards",
    offset: 0,
  },
];

const fun_animations_offset_small_container = document.getElementById(
  "fun_animations_offset_small"
);
const fun_animations_offset_small_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "opacity",
    duration: 5,
    steps: "0",
    fill: "forwards",
    offset: 0.1, // Default
  },
];

const fun_animations_offset_large_container = document.getElementById(
  "fun_animations_offset_large"
);
const fun_animations_offset_large_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "opacity",
    duration: 5,
    steps: "0",
    fill: "forwards",
    offset: 0.5,
  },
];

const fun_animations_offset_custom_container = document.getElementById(
  "fun_animations_offset_custom"
);
const fun_animations_offset_custom_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "opacity",
    duration: 5,
    steps: "0",
    fill: "forwards",
    offset: (index, priority) => {
      return index * index * 0.05;
    },
  },
];

if (
  fun_animations_offset_none_container &&
  fun_animations_offset_small_container &&
  fun_animations_offset_large_container &&
  fun_animations_offset_custom_container
) {
  const fun_animations_offset_none = new FunText(
    fun_animations_offset_none_container,
    fun_animations_offset_none_animations
  );
  fun_animations_offset_none.mount()?.pauseAll();

  const fun_animations_offset_small = new FunText(
    fun_animations_offset_small_container,
    fun_animations_offset_small_animations
  );
  fun_animations_offset_small.mount()?.pauseAll();

  const fun_animations_offset_large = new FunText(
    fun_animations_offset_large_container,
    fun_animations_offset_large_animations
  );
  fun_animations_offset_large.mount()?.pauseAll();

  const fun_animations_offset_custom = new FunText(
    fun_animations_offset_custom_container,
    fun_animations_offset_custom_animations
  );
  fun_animations_offset_custom.mount()?.pauseAll();

  const play_button = document.getElementById("fun_animations_offset_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_animations_offset_none.playAll();
      fun_animations_offset_small.playAll();
      fun_animations_offset_large.playAll();
      fun_animations_offset_custom.playAll();
    });
  }

  const pause_button = document.getElementById("fun_animations_offset_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_animations_offset_none.pauseAll();
      fun_animations_offset_small.pauseAll();
      fun_animations_offset_large.pauseAll();
      fun_animations_offset_custom.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_animations_offset_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_animations_offset_none.resetAll();
      fun_animations_offset_small.resetAll();
      fun_animations_offset_large.resetAll();
      fun_animations_offset_custom.resetAll();
    });
  }
}
