let socket = io();
let cameraId = "";
let img = document.querySelector("img");
let cid = document.querySelector(".cid");
let btn = document.querySelector("button");
btn.addEventListener("click", function () {
  cameraId = cid.value;
});
socket.on("connect", () => {
  console.log("connected!!");
});
socket.on("transfer", (e) => {
  if (cameraId == e.cameraId) {
    img.src = e.data;
  }
});
socket.on("disconnect", () => {});
