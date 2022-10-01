const popupLinks = document.querySelectorAll(".popup-link"); 
const body = document.querySelector("body"); //блокирует скрол в боди
const lockPadding = document.querySelectorAll(".lock-padding"); //

let unlock = true; //по умолчанию true, чтобы не было двойных нажатий

const timeout = 800;