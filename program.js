let programs = JSON.parse(localStorage.getItem("programs")) || [];

// Login Admin Program
function loginProgram() {
  if(idProgram.value === "eventUU" && passProgram.value === "UULADA"){
    loginBoxProgram.style.display = "none";
    adminBoxProgram.style.display = "block";
  } else {
    alert("Login gagal");
  }
}

function logoutProgram() {
  location.reload();
}

// Simpan program / maklum balas
function saveProgram() {
  const newProgram = {
    jenis: jenisProgram.value,
    tarikhTerima: tarikhTerimaProgram.value,
    tarikhSurat: tarikhSuratProgram.value,
    perkara: perkaraProgram.value,
    daripada: daripadaProgram.value,
    tindakan: tindakanProgram.value,
    tarikhAkhir: tarikhAkhir.value,
    pengerusi: pengerusi.value,
    tempat: tempat.value,
    detail: detail.value
  };
  programs.push(newProgram);
  localStorage.setItem("programs", JSON.stringify(programs));
  alert("Disimpan!");
  paparkanProgram();
}

// Papar senarai program umum
function paparkanProgram() {
  if(!document.getElementById("programList")) return;
  const list = document.getElementById("programList");
  const reminder = document.getElementById("reminderList");
  list.innerHTML = "";
  reminder.innerHTML = "";

  const today = new Date();
  programs.forEach(p => {
    let html = `<div class="card">
      <strong>${p.perkara}</strong><br>
      Tarikh Event: ${p.tarikhSurat || "-"}<br>
      Pengerusi: ${p.pengerusi || "-"}<br>
      Tempat: ${p.tempat || "-"}<br>
      Detail: ${p.detail || "-"}<br>
    </div>`;
    if(p.jenis === "event") {
      list.innerHTML += html;
    } else if(p.jenis === "reminder") {
      let due = new Date(p.tarikhAkhir);
      if(due >= today){
        reminder.innerHTML += `<div class="card"><strong>${p.perkara}</strong> - Tarikh Akhir: ${p.tarikhAkhir}</div>`;
      }
    }
  });
}

// Papar program bila buka umum
paparkanProgram();

// Search Program
if(document.getElementById("searchProgram")){
  searchProgram.addEventListener("keyup", function(){
    const term = this.value.toLowerCase();
    const filtered = programs.filter(p => p.perkara.toLowerCase().includes(term));
    const list = document.getElementById("programList");
    list.innerHTML = "";
    filtered.forEach(p => {
      if(p.jenis === "event"){
        list.innerHTML += `<div class="card">
          <strong>${p.perkara}</strong><br>
          Tarikh Event: ${p.tarikhSurat || "-"}<br>
          Pengerusi: ${p.pengerusi || "-"}<br>
          Tempat: ${p.tempat || "-"}<br>
          Detail: ${p.detail || "-"}<br>
        </div>`;
      }
    });
  });
}
