import { FunText, type AnimationId, type InputAnimation } from "funtext";

const test: AnimationId = {
  scope: 0,
  property: "",
};

const funtext_container = document.getElementById("funtext");
const funtext_animations: InputAnimation[] = [
  {
    scope: "letter",
    property: "color",
    duration: 1.15,
    steps: [
      "rgb(228, 228, 240)",
      "rgb(47, 212, 47)",
      "rgb(25, 128, 25)",
      "rgb(47, 212, 47)",
      "rgb(228, 228, 240)",
    ],
    iteration: "infinite",
    sync: {
      location: 0,
      duration: 10,
    },
    offset: 0.25,
  },
];

if (funtext_container) {
  const text1 = new FunText(funtext_container, funtext_animations);
  text1.mount();
  text1.pause({ scope: 1, property: "" });
}
