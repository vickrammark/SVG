const svgMainConainer = document.getElementById("svg-main-container");
const actionSelectionContainer = document.getElementById("id-action-selector");

let svgPointTracker = [];
let pathTracker = [];
let currentAction = "addPoints";
let isPointSelected = false;
let startPointPath = "";
let endPointPath = "";
let startPointDetail = {};
let endPointDetail = {};
let mouseMoveDetail = {};
let pathDrawAnimationStarted = false;
let currentPathConstructed = "";

// points predefined data
const pointRadius = 1;
const pointFillColor = "#009990";
const pathStrokeColor = "#009990";
const selectedPointStrokeColor = "#FF7F3E";
const pointStrokeColor = "#80C4E9";
const pointStrokWdith = ".4";
const svgDimension = svgMainConainer.getBoundingClientRect();

const drawJoinPaths = (e) => {
  const offset = 10;
  let normalizedX = ((e.offsetX - offset) / svgDimension.width) * 100;
  let normalizedY = ((e.offsetY - offset) / svgDimension.height) * 100;
  if (e.preventNormalize) {
    normalizedX = e.offsetX;
    normalizedY = e.offsetY;
  }
  if (!currentPathConstructed) return;

  const constructedPath = `L${normalizedX} ${normalizedY}`;
  currentPathConstructed.setAttribute(
    "d",
    `${startPointPath} ${constructedPath}`
  );
};

const updateCurrentAction = (e) => {
  currentAction = e.target.value;
  svgMainConainer.removeEventListener("mouseover", drawJoinPaths);
};

const svgClickHandler = (e) => {
  if (currentAction == "addPoints") {
    addPointsToSvg(e);
  }
};

const reorderAfterJoinPaths = () => {
  const circles = document.querySelectorAll(".guide-points");
  console.log(circles);
  circles.forEach((item) => {
    svgMainConainer.appendChild(item);
  });
};

const pointClickHandler = (e) => {
  const cx = parseFloat(e.target.getAttribute("cx"));
  const cy = parseFloat(e.target.getAttribute("cy"));
  if (currentAction == "movePoints") {
    e.target.setAttribute("stroke", selectedPointStrokeColor);
  }
  if (currentAction == "joinPoints") {
    e.target.setAttribute("stroke", selectedPointStrokeColor);
    if (!currentPathConstructed) {
      currentPathConstructed = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      currentPathConstructed.setAttribute("stroke", pathStrokeColor);
      currentPathConstructed.setAttribute("fill", "none");
    }
    svgMainConainer.appendChild(currentPathConstructed);
    if (!isPointSelected) {
      isPointSelected = true;
      startPointDetail = { x: cx, y: cy };
      startPointPath = `M${cx} ${cy}`;
      svgMainConainer.addEventListener("mousemove", drawJoinPaths);
    } else {
      isPointSelected = false;
      svgMainConainer.removeEventListener("mousemove", drawJoinPaths);
      drawJoinPaths({ offsetX: cx, offsetY: cy, preventNormalize: true });
      currentPathConstructed = null;
      reorderAfterJoinPaths();
    }
  }
};

const addPointsToSvg = (e) => {
  const svgDimension = svgMainConainer.getBoundingClientRect();
  const normalizedX = (e.offsetX / svgDimension.width) * 100;
  const normalizedY = (e.offsetY / svgDimension.height) * 100;
  const point = {
    x: normalizedX,
    y: normalizedY,
  };
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", point.x);
  circle.setAttribute("cy", point.y);
  circle.setAttribute("r", pointRadius);
  circle.setAttribute("fill", pointFillColor);
  circle.setAttribute("stroke", pointStrokeColor);
  circle.setAttribute("stroke-width", pointStrokWdith);
  circle.setAttribute("class", "guide-points");
  circle.setAttribute("id", `potin-id-${svgPointTracker.length}`);
  circle.addEventListener("click", pointClickHandler);
  svgMainConainer.appendChild(circle);
};

actionSelectionContainer.addEventListener("change", updateCurrentAction);

svgMainConainer.addEventListener("click", svgClickHandler);
