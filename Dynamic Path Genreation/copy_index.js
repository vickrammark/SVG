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

const drawJoinPaths = (e) => {
  const svgDimension = svgMainConainer.getBoundingClientRect();
  const normalizedX = (e.offsetX / svgDimension.width) * 100;
  const normalizedY = (e.offsetY / svgDimension.height) * 100;

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

const pointClickHandler = (e) => {
  const cx = parseFloat(e.target.getAttribute("cx"));
  const cy = parseFloat(e.target.getAttribute("cy"));
  if (currentAction == "movePoints") {
    e.target.setAttribute("stroke", selectedPointStrokeColor);
  }
  if (currentAction == "joinPoints") {
    e.target.setAttribute("stroke", selectedPointStrokeColor);
    currentPathConstructed = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    currentPathConstructed.setAttribute("stroke", pathStrokeColor);
    currentPathConstructed.setAttribute("fill", "none");
    svgMainConainer.appendChild(currentPathConstructed);
    if (!isPointSelected) {
      isPointSelected = true;
      startPointDetail = { x: cx, y: cy };
      startPointPath = `M${cx} ${cy}`;
      svgMainConainer.addEventListener("mouseover", drawJoinPaths);
      // a source point is selected for the first time
    } else {
      isPointSelected = false;
      svgMainConainer.removeEventListener("mouseover", drawJoinPaths);
      currentPathConstructed = null;
      // a destination is selected
    }
  }
};

const addPointsToSvg = (e) => {
  //Before creating the point normalize the point to match the svg grid size
  const svgDimension = svgMainConainer.getBoundingClientRect();
  const normalizedX = (e.offsetX / svgDimension.width) * 100;
  const normalizedY = (e.offsetY / svgDimension.height) * 100;
  const point = {
    x: normalizedX,
    y: normalizedY,
  };

  // track the points
  svgPointTracker.push(point);

  // 1. Draw circles to mark the points on the svg
  // 2. Append the circle to the svg
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
  circle.setAttribute("id", `potin-id-${svgPointTracker.length}`);
  circle.addEventListener("click", pointClickHandler);
  svgMainConainer.appendChild(circle);
};

actionSelectionContainer.addEventListener("change", updateCurrentAction);

svgMainConainer.addEventListener("click", svgClickHandler);
