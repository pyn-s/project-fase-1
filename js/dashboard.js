let dataMentah = localStorage.getItem("daftarPendaftar");
let daftarPendaftar = dataMentah ? JSON.parse(dataMentah) : [];

const tabelPeserta = document.getElementById("tablePeserta");

function renderTable() {
    tabelPeserta.innerHTML = "";

    if (daftarPendaftar.length === 0) {
        tabelPeserta.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada data pendaftar.</td></tr>`;
        return;
    }

    daftarPendaftar.forEach(function(peserta) {
        const baris = document.createElement('tr');

        baris.innerHTML = `
            <td>${peserta.nama}</td>
            <td>${peserta.email}</td>
            <td>${peserta.kelas}</td>
            <td>${peserta.jurusan}</td>
            <td><strong>${peserta.status.toUpperCase()}</strong></td>
            <td style="padding: 10px;">
                <button type="button" class="btn-edit" onclick="editDataPeserta('${peserta.id}')">Edit</button>
                <button type="button" class="btn-hapus" onclick="hapusDataPeserta('${peserta.id}')" style="background-color: red; color: white;">Hapus</button>
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

window.editDataPeserta = function(idTarget) {
    // kembali ke halaman utama
    window.location.href = "../index.html?editId=" + idTarget;
};

renderTable();
