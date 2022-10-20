const container = document.getElementById("container");
const contain = document.getElementById("contain");
const submit = document.getElementById("inputSubmit");
const text = document.getElementById("inputText");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  addCase(text.value);
  text.value = "";
});

withdrawCases();

// функция вывода всех дел
function withdrawCases() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        data[i].completed
          ? (div.style.opacity = "50%")
          : (div.style.opacity = "100%");
        div.className = "cases";

        const check = document.createElement("input");
        check.addEventListener("click", function (e) {
          e.preventDefault();
          checked2(i, check.checked ? true : false, check, div);
        });

        check.type = "checkbox";
        check.className = "check";
        data[i].completed ? (check.checked = "true") : null;

        const h1 = document.createElement("h1");
        h1.textContent = data[i].title;

        const button = document.createElement("button");
        button.addEventListener("click", function () {
          deleteNode(i, button.parentNode);
        });
        button.textContent = "❌";

        div.append(check, h1, button);

        contain.prepend(div);
      }
      console.log(data);
    });
}

// функция для удаления нода
function deleteNode(id, node) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  }).then((data) => {
    node.remove();
  });
}

//  функция для отметки дела как завершенное
function checked2(id, checked1, check, div) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: checked1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((data) => {
    check.checked ? (check.checked = false) : (check.checked = true);
    check.checked ? (div.style.opacity = "50%") : (div.style.opacity = "100%");
  });
}

// функция для добавления дела
function addCase(text) {
  fetch("https://jsonplaceholder.typicode.com/todos/", {
    method: "POST",
    body: JSON.stringify({ userId: 1, title: text, completed: false }),
  }).then((data) => {
    const div = document.createElement("div");
    div.className = "cases";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";

    const h1 = document.createElement("h1");
    h1.textContent = text;

    const button = document.createElement("button");
    button.textContent = "❌";

    div.append(check, h1, button);
    contain.prepend(div);
  });
}
