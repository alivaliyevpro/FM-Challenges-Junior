const unReadMessages = document.querySelectorAll(".unread");
const unread = document.getElementById("num-of-notif");
const markAll = document.getElementById("mark-as-read");

unread.innerText = unReadMessages.length;

unReadMessages.forEach((message) => {
  message.addEventListener("click", () => {
    message.classList.remove("unread");
    const newUnreadMessages = document.querySelectorAll(".unread");
    unread.innerText = newUnreadMessages.length;
  });
});

markAll.addEventListener("click", () => {
  unReadMessages.forEach((message) => {
    message.classList.remove("unread");
  });
  const newUnreadMessages = document.querySelectorAll(".unread");
  unread.innerText = newUnreadMessages.length;
});
