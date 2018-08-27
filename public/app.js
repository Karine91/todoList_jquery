$(document).ready(function() {
  $.getJSON("/api/todos").then(addTodos);

  $("#todoInput").keypress(function(event) {
    if (event.which == 13) {
      createTodo();
    }
  });

  $(".list").on("click", "span", function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });

  $(".list").on("click", "li", function(e) {
    updateTodo($(this));
  });
});

function addTodo(todo) {
  var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  if (todo.completed) {
    newTodo.addClass("completed");
  }
  $(".list").append(newTodo);
}

function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function createTodo(data) {
  var userInput = $("#todoInput").val();
  $.post("/api/todos", { name: userInput })
    .then(function(newTodo) {
      addTodo(newTodo);
      $("#todoInput").val("");
    })
    .catch(function(err) {
      console.log(err);
    });
}

function removeTodo(todo) {
  var id = todo.data("id");
  var deleteUrl = "/api/todos/" + id;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  })
    .then(function() {
      todo.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function updateTodo(todo) {
  var id = todo.data("id");
  var completed = !todo.data("completed");
  var updateData = { completed: completed };
  var updateUrl = "/api/todos/" + id;
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  }).then(function(updatedTodo) {
    todo.toggleClass("completed");
    todo.data("completed", completed);
  });
}
