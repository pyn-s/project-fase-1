let dataMentah = localStorage.getItem("daftarPendaftar");
let daftarPendaftar = dataMentah ? JSON.parse(dataMentah): [];

const tabelPeserta = document.getElementById("tablePeserta");

function renderTable() {
    tabelPeserta.innerHTML = "";

    daftarPendaftar.forEach(function(peserta)  {
        const baris = document.createElement('tr');

        baris.innerHTML = `
        <td>${peserta.nama}</td>
        <td>${peserta.email}</td>
        <td>${peserta.kelas}</td>
        <td>${peserta.jurusan}</td>
        <td>${peserta.status}</td>
        <td><strong>${peserta.status.toUpperCase()}</storng></td>
        <td style = "padding: 10px;">
        <button type ="button" class="btn-edit" onclick="editDataPeserta('${peserta.id}')">Edit</button>
        <button type ="button" class="btn-hapus" onclick="hapusDataPeserta('${peserta.id}')">Hapus</button>
        </td>
    `;
    tabelPeserta.appendChild(baris);
    });
        
}

window.hapusDataPeserta = function(idTarget) {
    let konfirmasi = confirm("Hapus data peserta ini?");

    if (konfirmasi) {
        daftarPendaftar = daftarPendaftar.filter(function(peserta){
            return peserta.id !== idTarget;
        });

        localStorage.setItem("daftarPendaftar", JSON.stringify(daftarPendaftar));
        renderTable();
        console.log("Data berhasil dihapus!");
    }
};

window.editDataPeserta = function(idTarger) {

    window.location.href = "../index.html?editId=" + idTarger;
};

renderTable();