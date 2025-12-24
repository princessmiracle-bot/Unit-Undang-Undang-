// Ambil elemen admin box
const tarikhTerima = document.getElementById("tarikhTerima");
const tarikhSurat = document.getElementById("tarikhSurat");
const kategori = document.getElementById("kategori");
const perkara = document.getElementById("perkara");
const rujukan = document.getElementById("rujukan");
const daripada = document.getElementById("daripada");
const pengirim = document.getElementById("pengirim");
const tindakan = document.getElementById("tindakan");
const kepada = document.getElementById("kepada");
const suratListAdmin = document.getElementById("suratListAdmin");
const suratList = document.getElementById("suratList");
const adminBox = document.getElementById("adminBox");
const umumBox = document.getElementById("umumBox");
const adminLoginBox = document.getElementById("adminLoginBox");

let data = JSON.parse(localStorage.getItem("suratData")) || [];
let editIndex = null;

// Simpan surat
function saveSurat() {
  const surat = {
    tarikhTerima: tarikhTerima.value,
    tarikhSurat: tarikhSurat.value,
    kategori: kategori.value,
    perkara: perkara.value,
    rujukan: rujukan.value,
    daripada: daripada.value,
    pengirim: pengirim.value,
    tindakan: tindakan.value,
    kepada: kepada.value
  };

  if(editIndex !== null){
    data[editIndex] = surat;
    editIndex = null;
  } else {
    data.push(surat);
  }

  localStorage.setItem("suratData", JSON.stringify(data));
  clearForm();
  renderTable();
}

// Papar table
function renderTable(){
  // Untuk admin
  if(suratListAdmin){
    suratListAdmin.innerHTML = "";
    data.forEach((s, i) => {
      suratListAdmin.innerHTML += `
        <tr>
          <td>${s.tarikhTerima}</td>
          <td>${s.tarikhSurat}</td>
          <td>${s.perkara}</td>
          <td>${s.rujukan}</td>
          <td>${s.daripada}</td>
          <td>${s.tindakan}</td>
          <td>${s.kepada}</td>
          <td>
            <button onclick="editSurat(${i})">Edit</button>
            <button onclick="deleteSurat(${i})">Padam</button>
          </td>
        </tr>
      `;
    });
  }

  // Untuk paparan umum
  if(suratList){
    suratList.innerHTML = "";
    data.forEach(s => {
      suratList.innerHTML += `
        <tr>
          <td>${s.tarikhTerima}</td>
          <td>${s.tarikhSurat}</td>
          <td>${s.perkara}</td>
          <td>${s.rujukan}</td>
          <td>${s.daripada}</td>
          <td>${s.kepada}</td>
        </tr>
      `;
    });
  }
}

// Edit surat
function editSurat(i){
  const s = data[i];
  tarikhTerima.value = s.tarikhTerima;
  tarikhSurat.value = s.tarikhSurat;
  kategori.value = s.kategori;
  perkara.value = s.perkara;
  rujukan.value = s.rujukan;
  daripada.value = s.daripada;
  pengirim.value = s.pengirim;
  tindakan.value = s.tindakan;
  kepada.value = s.kepada;
  editIndex = i;
}

// Delete surat
function deleteSurat(i){
  if(confirm("Padam surat ini?")){
    data.splice(i,1);
    localStorage.setItem("suratData", JSON.stringify(data));
    renderTable();
  }
}

// Clear form
function clearForm(){
  tarikhTerima.value = "";
  tarikhSurat.value = "";
  kategori.selectedIndex = 0;
  perkara.value = "";
  rujukan.value = "";
  daripada.selectedIndex = 0;
  pengirim.value = "";
  tindakan.value = "";
  kepada.value = "";
}

// Login Admin
function showAdminLogin() {
  adminLoginBox.style.display = 'block';
}
function closeAdminLogin() {
  adminLoginBox.style.display = 'none';
}
function loginSurat() {
  const id = document.getElementById("id").value;
  const pass = document.getElementById("pass").value;

  if(id === "admin" && pass === "UULADA"){
    alert("Login berjaya! Admin boleh tambah/edit surat");
    adminBox.style.display = 'block';
    adminLoginBox.style.display = 'none';
    umumBox.style.display = 'none'; // sembunyikan paparan umum
  } else {
    alert("Login gagal");
  }
}

// Logout Admin
function logout() {
  adminBox.style.display = 'none';
  umumBox.style.display = 'block';
}

renderTable();
