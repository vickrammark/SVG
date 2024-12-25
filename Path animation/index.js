const path = document.getElementById("path");
const totalLength = path.getTotalLength();
path.style.strokeDasharray = totalLength;
path.style.strokeDashoffset = totalLength;
console.log(totalLength);
window.addEventListener("scroll", (e) => {
  const percent =
    (document.documentElement.scrollTop - document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  const drawnLength = percent * totalLength;
  path.style.strokeDashoffset = totalLength - drawnLength;
});
