import { FunText, type AnimationId, type InputAnimation } from "funtext";

// Page title
const funtext_title_container = document.getElementById("funtext");
const funtext_title_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 1.15,
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
const funtext_example_setup_container = document.getElementById(
  "funtext_example_setup"
);
const funtext_example_setup_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "translate",
    duration: 1.5,
    steps: "0 10px",
    iteration: "infinite",
    direction: "alternate",
  },
];
if (funtext_example_setup_container) {
  const funtext_example_setup = new FunText(
    funtext_example_setup_container,
    funtext_example_setup_animations
  );
  funtext_example_setup.mount();
}
