import { FunText, type AnimationId, type InputAnimation } from "funtext";

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
];
if (fun_setup_container) {
  const fun_setup = new FunText(fun_setup_container, fun_setup_animations);
  fun_setup.mount();
}

// Scope - Build-in example
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
  fun_scope_buildin_word.mount();

  const fun_scope_buildin_letter = new FunText(
    fun_scope_buildin_letter_container,
    fun_scope_buildin_letter_animations
  );
  fun_scope_buildin_letter.mount();
}

const fun_scope_custom_container = document.getElementById("fun_scope_custom");
const fun_scope_custom_animations: InputAnimation[] = [
  {
    scope: {
      split: "A",
      priority: 0,
    },
    property: "translate",
    duration: 1,
    steps: ["0 -5px", "0 5px"],
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
  fun_scope_custom.mount();
}
