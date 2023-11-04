import { FunText } from "funtext";

const container1 = document.getElementById("test1");
console.log(container1);
const animations1 = [
  {
    scope: "letter",
    property: "color",
    duration: 5,
    steps: "red",
    sync: {
      location: 0,
      duration: 5,
    },
    iteration: "infinite",
    direction: "alternate",
  },
  {
    scope: "letter",
    type: "transform",
    animations: [
      {
        property: "translateX",
        duration: 5,
        unit: "px",
        steps: "25",
      },
    ],
    iteration: "infinite",
    direction: "alternate",
  },
];

console.log(animations1);

if (container1) {
  //@ts-ignore
  const text1 = new FunText(container1, animations1);
  text1.mount();
  text1.pause({ scope: 1, property: "" });
}
