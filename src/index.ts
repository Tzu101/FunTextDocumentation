import {
  FunText,
  type AnimationId,
  type InputAnimation,
  type InputOptions,
} from "funtext";

// Menu control
const maxMobile = 768;
const sliderWidth = "200px";
const sidebar = document.getElementById("sidebar");
const close = document.getElementById("close");
const background = document.getElementById("background");

let isMobile = window.innerWidth <= maxMobile;
let isOpen = false;

function updateMenu() {
  // Scroll control
  if (isMobile && isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

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

// Scrool behaviour
const scroolOffset = 85;

function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const newPosition = elementPosition - scroolOffset;

    window.scrollTo({
      top: newPosition,
      behavior: "smooth",
    });

    // Change the URL by modifying the fragment identifier
    window.history.pushState(null, "", "#" + elementId);
  }
}

if (sidebar) {
  const links = sidebar.getElementsByTagName("a");
  for (const link of links) {
    const href = link.getAttribute("href");
    if (!href || href[0] !== "#") {
      continue;
    }

    const linkId = href.slice(1);
    if (!linkId) {
      continue;
    }

    link.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      scrollToElement(linkId);

      if (isOpen) {
        isOpen = false;
        updateMenu();
      }
    });
  }
}

// Use the fetch function to make a GET request to the URL
// Funtext latest version
const apiUrl = "https://registry.npmjs.org/funtext/latest";

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
  css: {
    container: "color: rgb(19, 19, 25); background: rgb(228, 228, 240);",
    dark: {
      container: "color: rgb(228, 228, 240); background: rgb(19, 19, 25);",
    },
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
const funtext_title_options: InputOptions = {
  css: {
    text: "font-size: 1.6rem; font-weight: bold;",
    768: {
      text: "font-size: 1.4rem;",
    },
    400: {
      text: "font-size: 1.2rem;",
    },
  },
};

if (funtext_title_container) {
  const funtext_title = new FunText(
    funtext_title_container,
    funtext_title_animations,
    funtext_title_options
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
const fun_setup_options: InputOptions = {
  defaults: {
    iteration: "infinite",
    direction: "alternate",
  },
};
if (fun_setup_container) {
  const fun_setup = new FunText(
    fun_setup_container,
    fun_setup_animations,
    fun_setup_options
  );
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
    steps: ["blue", "green", "yellow", "red"],
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

// Sync example
const fun_animations_sync_none_container = document.getElementById(
  "fun_animations_sync_none"
);
const fun_animations_sync_none_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "background",
    duration: 6,
    steps: "red",
  },
];

const fun_animations_sync_start_container = document.getElementById(
  "fun_animations_sync_start"
);
const fun_animations_sync_start_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "background",
    duration: 3,
    steps: "red",
    sync: {
      duration: 6,
      location: "start",
    },
  },
];

const fun_animations_sync_middle_container = document.getElementById(
  "fun_animations_sync_middle"
);
const fun_animations_sync_middle_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "background",
    duration: 3,
    steps: "red",
    sync: {
      duration: 6,
      location: "middle",
    },
  },
];
{
}

const fun_animations_sync_end_container = document.getElementById(
  "fun_animations_sync_end"
);
const fun_animations_sync_end_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "background",
    duration: 3,
    steps: "red",
    sync: {
      duration: 6,
      location: "end",
    },
  },
];

if (
  fun_animations_sync_none_container &&
  fun_animations_sync_start_container &&
  fun_animations_sync_middle_container &&
  fun_animations_sync_end_container
) {
  const none_length = fun_animations_sync_none_container.innerText.length;
  const fun_animations_sync_none = new FunText(
    fun_animations_sync_none_container,
    fun_animations_sync_none_animations,
    { defaults: { offset: 0.1 } }
  );
  fun_animations_sync_none.mount()?.pauseAll();

  const start_length = fun_animations_sync_start_container.innerText.length;
  const fun_animations_sync_start = new FunText(
    fun_animations_sync_start_container,
    fun_animations_sync_start_animations,
    { defaults: { offset: (0.1 * none_length) / start_length } }
  );
  fun_animations_sync_start.mount()?.pauseAll();

  const middle_length = fun_animations_sync_middle_container.innerText.length;
  const fun_animations_sync_middle = new FunText(
    fun_animations_sync_middle_container,
    fun_animations_sync_middle_animations,
    { defaults: { offset: (0.1 * none_length) / middle_length } }
  );
  fun_animations_sync_middle.mount()?.pauseAll();

  const end_length = fun_animations_sync_end_container.innerText.length;
  const fun_animations_sync_end = new FunText(
    fun_animations_sync_end_container,
    fun_animations_sync_end_animations,
    { defaults: { offset: (0.1 * none_length) / end_length } }
  );
  fun_animations_sync_end.mount()?.pauseAll();

  const play_button = document.getElementById("fun_animations_sync_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_animations_sync_none.playAll();
      fun_animations_sync_start.playAll();
      fun_animations_sync_middle.playAll();
      fun_animations_sync_end.playAll();
    });
  }

  const pause_button = document.getElementById("fun_animations_sync_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_animations_sync_none.pauseAll();
      fun_animations_sync_start.pauseAll();
      fun_animations_sync_middle.pauseAll();
      fun_animations_sync_end.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_animations_sync_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_animations_sync_none.resetAll();
      fun_animations_sync_start.resetAll();
      fun_animations_sync_middle.resetAll();
      fun_animations_sync_end.resetAll();
    });
  }
}

// Transform and filter example
const fun_animations_custom_transform_container = document.getElementById(
  "fun_animations_custom_transform"
);
const fun_animations_custom_transform_animations: InputAnimation[] = [
  {
    scope: "letter",
    type: "transform",
    properties: [
      {
        property: "translateY",
        duration: 5,
        unit: "px",
        steps: "-5",
      },
      {
        property: "rotate",
        duration: 5,
        unit: "deg",
        steps: { 50: "180" },
      },
    ],
    fill: "forwards",
  },
];

const fun_animations_custom_filter_container = document.getElementById(
  "fun_animations_custom_filter"
);
const fun_animations_custom_filter_animations: InputAnimation[] = [
  {
    scope: "letter",
    type: "filter",
    properties: [
      {
        property: "opacity",
        duration: 5,
        unit: "",
        steps: [1, 0],
      },
      {
        property: "blur",
        duration: 4,
        unit: "px",
        steps: 2,
      },
    ],
    fill: "forwards",
  },
];

if (
  fun_animations_custom_transform_container &&
  fun_animations_custom_filter_container
) {
  const fun_animations_custom_transform = new FunText(
    fun_animations_custom_transform_container,
    fun_animations_custom_transform_animations
  );
  fun_animations_custom_transform.mount()?.pauseAll();

  const fun_animations_custom_filter = new FunText(
    fun_animations_custom_filter_container,
    fun_animations_custom_filter_animations
  );
  fun_animations_custom_filter.mount()?.pauseAll();

  const play_button = document.getElementById("fun_animations_custom_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_animations_custom_transform.playAll();
      fun_animations_custom_filter.playAll();
    });
  }

  const pause_button = document.getElementById("fun_animations_custom_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_animations_custom_transform.pauseAll();
      fun_animations_custom_filter.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_animations_custom_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_animations_custom_transform.resetAll();
      fun_animations_custom_filter.resetAll();
    });
  }
}

// Options text example
const fun_options_text_container = document.getElementById("fun_options_text");
const fun_options_text_options: InputOptions = {
  text: "New text provided in options",
};
if (fun_options_text_container) {
  const fun_options_text = new FunText(
    fun_options_text_container,
    [],
    fun_options_text_options
  );
  fun_options_text.mount();
}

// Options defaults example
const fun_options_defaults_container = document.getElementById(
  "fun_options_defaults"
);
const fun_options_defaults_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 3,
    steps: "rgb(81, 150, 173)",
  },
];
const fun_options_defaults_options: InputOptions = {
  defaults: {
    iteration: "infinite",
    direction: "alternate",
  },
};
if (fun_options_defaults_container) {
  const fun_options_defaults = new FunText(
    fun_options_defaults_container,
    fun_options_defaults_animations,
    fun_options_defaults_options
  );
  fun_options_defaults.mount()?.pauseAll();

  const play_button = document.getElementById("fun_options_defaults_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_options_defaults.playAll();
    });
  }

  const pause_button = document.getElementById("fun_options_defaults_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_options_defaults.pauseAll();
    });
  }

  const reset_button = document.getElementById("fun_options_defaults_reset");
  if (reset_button) {
    reset_button.addEventListener("click", () => {
      fun_options_defaults.resetAll();
    });
  }
}

// Options css example
const fun_options_css_container = document.getElementById("fun_options_css");
const fun_options_css_options: InputOptions = {
  css: {
    root: "font-size: 1.5rem;",
  },
};

const fun_options_css_dark_container = document.getElementById(
  "fun_options_css_dark"
);
const fun_options_css_dark_options: InputOptions = {
  css: {
    container: "color: blue;",
    dark: {
      container: "color: red;",
    },
  },
};

const fun_options_css_layout_container = document.getElementById(
  "fun_options_css_layout"
);
const fun_options_css_layout_options: InputOptions = {
  css: {
    text: "text-decoration: dashed; text-decoration-line: underline",
    768: {
      text: "text-decoration: underline;",
    },
  },
};

if (
  fun_options_css_container &&
  fun_options_css_dark_container &&
  fun_options_css_layout_container
) {
  const fun_options_css = new FunText(
    fun_options_css_container,
    [],
    fun_options_css_options
  );
  fun_options_css.mount();

  const fun_options_css_dark = new FunText(
    fun_options_css_dark_container,
    [],
    fun_options_css_dark_options
  );
  fun_options_css_dark.mount();

  const fun_options_css_layout = new FunText(
    fun_options_css_layout_container,
    [],
    fun_options_css_layout_options
  );
  fun_options_css_layout.mount();
}

// Controls build example
const fun_controls_build_container =
  document.getElementById("fun_controls_build");
const fun_controls_build_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "translate",
    steps: "0 4px",
    duration: 0.5,
    iteration: "infinite",
    direction: "alternate",
    offset: 0.2,
  },
];
const fun_controls_build_options: InputOptions = {
  text: "Loading...",
};

if (fun_controls_build_container) {
  const fun_controls_build = new FunText(
    fun_controls_build_container,
    fun_controls_build_animations,
    fun_controls_build_options
  );

  const mount_button = document.getElementById("fun_controls_build_mount");
  if (mount_button) {
    mount_button.addEventListener("click", () => {
      fun_controls_build.mount();
    });
  }

  const unmount_button = document.getElementById("fun_controls_build_unmount");
  if (unmount_button) {
    unmount_button.addEventListener("click", () => {
      fun_controls_build.unmount();
    });
  }

  const clicks = document.getElementById("fun_controls_build_clicks");
  let click_num = 0;
  const click_button = document.getElementById("fun_controls_build_click");
  if (click_button) {
    click_button.addEventListener("click", () => {
      click_num += 1;
      if (clicks) {
        clicks.innerHTML = "Clicks: " + click_num;
      }
    });
  }
}

// Controls setters example
const fun_controls_set_start_container = document.getElementById(
  "fun_controls_set_start"
);
const fun_controls_set_new_container = document.getElementById(
  "fun_controls_set_new"
);

const fun_controls_set_start_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    steps: ["lime", "green", "lime"],
    duration: 3,
    iteration: "infinite",
    sync: {
      duration: 6,
      location: 0,
    },
  },
];
const fun_controls_set_new_animations: InputAnimation[] = [
  {
    scope: "word",
    property: "translate",
    steps: "10px 0",
    duration: 4,
    iteration: "infinite",
    direction: "alternate",
  },
];

const fun_controls_set_start_options = {
  css: {
    text: "font-size: 1.5rem;",
  },
};
const fun_controls_set_new_options = {
  css: {
    text: "font-size: 1.1rem;",
  },
};

if (fun_controls_set_start_container && fun_controls_set_new_container) {
  const fun_controls_set = new FunText(
    fun_controls_set_start_container,
    fun_controls_set_start_animations,
    fun_controls_set_start_options
  );
  fun_controls_set.mount()?.pauseAll();

  const container_button = document.getElementById(
    "fun_controls_set_container"
  );
  if (container_button) {
    container_button.addEventListener("click", () => {
      fun_controls_set.container = fun_controls_set_new_container;
    });
  }

  const animations_button = document.getElementById(
    "fun_controls_set_animations"
  );
  if (animations_button) {
    animations_button.addEventListener("click", () => {
      fun_controls_set.animations = fun_controls_set_new_animations;
    });
  }

  const options_button = document.getElementById("fun_controls_set_options");
  if (options_button) {
    options_button.addEventListener("click", () => {
      fun_controls_set.options = fun_controls_set_new_options;
    });
  }

  const play_button = document.getElementById("fun_controls_set_play");
  if (play_button) {
    play_button.addEventListener("click", () => {
      fun_controls_set.playAll();
    });
  }

  const pause_button = document.getElementById("fun_controls_set_pause");
  if (pause_button) {
    pause_button.addEventListener("click", () => {
      fun_controls_set.pauseAll();
    });
  }
}

// Controls paystate example
const fun_controls_state_container =
  document.getElementById("fun_controls_state");
const fun_controls_state_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "background",
    steps: ["yellow", "orange", "red", "lime", "green", "blue", "purple"],
    duration: 7,
    iteration: "infinite",
    direction: "alternate",
  },
  {
    scope: "letter",
    property: "color",
    steps: ["purple", "blue", "green", "lime", "red", "orange", "yellow"],
    duration: 7,
    iteration: "infinite",
    direction: "alternate",
  },
];

if (fun_controls_state_container) {
  const fun_controls_state = new FunText(
    fun_controls_state_container,
    fun_controls_state_animations
  );
  fun_controls_state.mount()?.pauseAll();

  const first_id: AnimationId = {
    property: "background",
    scope: "letter",
  };

  const status_any = document.getElementById("fun_controls_state_status_any");
  const status_all = document.getElementById("fun_controls_state_status_all");
  function updateStatus() {
    if (status_any && status_all) {
      status_any.innerText =
        "Playing any: " + fun_controls_state.isPlayingAny();
      status_all.innerText =
        "Playing all: " + fun_controls_state.isPlayingAll();
    }
  }

  const play_first_button = document.getElementById(
    "fun_controls_state_play_first"
  );
  if (play_first_button) {
    play_first_button.addEventListener("click", () => {
      fun_controls_state.play(first_id);
      updateStatus();
    });
  }

  const pause_first_button = document.getElementById(
    "fun_controls_state_pause_first"
  );
  if (pause_first_button) {
    pause_first_button.addEventListener("click", () => {
      fun_controls_state.pause(first_id);
      updateStatus();
    });
  }

  const toggle_first_button = document.getElementById(
    "fun_controls_state_toggle_first"
  );
  if (toggle_first_button) {
    toggle_first_button.addEventListener("click", () => {
      fun_controls_state.toggle(first_id);
      updateStatus();
    });
  }

  const play_all_button = document.getElementById(
    "fun_controls_state_play_all"
  );
  if (play_all_button) {
    play_all_button.addEventListener("click", () => {
      fun_controls_state.playAll();
      updateStatus();
    });
  }

  const pause_all_button = document.getElementById(
    "fun_controls_state_pause_all"
  );
  if (pause_all_button) {
    pause_all_button.addEventListener("click", () => {
      fun_controls_state.pauseAll();
      updateStatus();
    });
  }

  const toggle_all_button = document.getElementById(
    "fun_controls_state_toggle_all"
  );
  if (toggle_all_button) {
    toggle_all_button.addEventListener("click", () => {
      fun_controls_state.toggleAll();
      updateStatus();
    });
  }
}
