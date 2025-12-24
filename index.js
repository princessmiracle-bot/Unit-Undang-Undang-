// ====== Calendar 7 Hari (highlight hari ini) ======
function generateCalendar() {
  const today = new Date();
  const monthNames = ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"];
  const calendarDiv = document.getElementById("calendar");
  
  calendarDiv.innerHTML = `<strong>${monthNames[today.getMonth()]} ${today.getFullYear()}</strong><br>`;
  
  // Papar 7 hari: 3 hari sebelum + hari ini + 3 hari selepas
  for(let i=-3; i<=3; i++){
    let d = new Date();
    d.setDate(today.getDate() + i);
    let display = d.toLocaleDateString('ms-MY', { weekday: 'long', day: 'numeric' });
    if(i===0) {
      display = `<strong style="color:#c9a227;">${display} (Hari Ini)</strong>`;
    }
    calendarDiv.innerHTML += display + "<br>";
  }
}

// ====== Senarai Pegawai Unit Undang-Undang ======
const pegawai = [
  { nama: "Cik Saniah", jawatan: "Pengurus Unit Undang-Undang" },
  { nama: "Pn. Faizelina", jawatan: "Penolong Pengurus Kanan Unit Undang-Undang" },
  { nama: "Cik Zaimah", jawatan: "Penolong Pengurus Unit Undang-Undang" },
  { nama: "Cik Fatimah", jawatan: "Penolong Pegawai Undang-Undang" },
  { nama: "Pn. Noorkatini", jawatan: "Pembantu Tadbir 1 Unit Undang-Undang (PTPO1)" },
  { nama: "Pn. Siti Aminah", jawatan: "Pembantu Tadbir 2 Unit Undang-Undang (PTPO2)" },
  { nama: "Cik Norzalikha Farhana", jawatan: "Pembantu Pegawai Tadbir" }
];

function paparkanPegawai() {
  const listDiv = document.getElementById("pegawaiList");
  pegawai.forEach(p => {
    listDiv.innerHTML += `<div class="card" style="padding:10px;margin:5px;">
      <strong>${p.nama}</strong><br>
      ${p.jawatan}
    </div>`;
  });
}

// ====== Event Hari Ini (ambil dari localStorage program.js) ======
function eventHariIni() {
  const eventDiv = document.getElementById("todayEvent");
  const programs = JSON.parse(localStorage.getItem("programs")) || [];
  const today = new Date().toISOString().split('T')[0];
  let eventsToday = programs.filter(p => p.jenis === "event" && p.tarikhSurat === today);
  
  if(eventsToday.length === 0){
    eventDiv.innerHTML = "Tiada event hari ini";
  } else {
    eventDiv.innerHTML = "";
    eventsToday.forEach(e => {
      eventDiv.innerHTML += `<div class="card" style="padding:10px;margin:5px;">
        <strong>${e.perkara}</strong><br>
        Tempat: ${e.tempat || "-"}<br>
        Pengerusi: ${e.pengerusi || "-"}
      </div>`;
    });
  }
}

// ====== Jalankan semua fungsi bila page load ======
window.onload = function() {
  generateCalendar();
  paparkanPegawai();
  eventHariIni();
}
