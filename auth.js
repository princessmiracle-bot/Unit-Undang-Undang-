function loginSurat() {
  const id = document.getElementById("id").value;
  const pass = document.getElementById("pass").value;

  if (id === "admin" && pass === "UULADA") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminBox").style.display = "block";
  } else {
    alert("Login gagal");
  }
}

function logout() {
  document.getElementById("adminBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}
