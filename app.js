function checkButtons() {
  let gravity1 = document.getElementById("g1");
  let gravity2 = document.getElementById("g2");
  let gravity3 = document.getElementById("g3");
  if (gravity == 1) {
    gravity1.classList.add("active");
    gravity2.classList.remove("active");
    gravity3.classList.remove("active");
  }
  if (gravity == 2) {
    gravity1.classList.remove("active");
    gravity2.classList.add("active");
    gravity3.classList.remove("active");
  }
  if (gravity == 3) {
    gravity1.classList.remove("active");
    gravity2.classList.remove("active");
    gravity3.classList.add("active");
  }
}
