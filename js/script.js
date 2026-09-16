let dataMentah = localStorage.getItem("daftarPendaftar");
let daftarPendaftar = dataMentah ? JSON.parse(dataMentah) : [];

const checkbox = document.getElementById('setuju');
const tombol = document.getElementById('submit');
const form = document.getElementById('form');

checkbox.addEventListener("change", function(){
    tombol.disabled = !checkbox.checked;
});

const urlParams = new URLSearchParams(window.location.search);
const editIdDariUrl = urlParams.get('editId');

if (editIdDariUrl) {
    const dataAkanDiedit = daftarPendaftar.find(p => p.id === editIdDariUrl);
    
    if (dataAkanDiedit) {
        document.getElementById("editId").value = dataAkanDiedit.id;
        document.getElementById("nama").value = dataAkanDiedit.nama;
        document.getElementById("email").value = dataAkanDiedit.email;
        document.getElementById("kelas").value = dataAkanDiedit.kelas;
        document.getElementById("jurusan").value = dataAkanDiedit.jurusan;
        document.getElementById("kegiatan").value = dataAkanDiedit.kegiatan || "";
        document.getElementById("status").value = dataAkanDiedit.status;
        
        tombol.textContent = "Perbarui Data";
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let valid = true;

    const idHidden = document.getElementById("editId").value;
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const kelas = document.getElementById("kelas").value;
    const jurusan = document.getElementById("jurusan").value;
    const kegiatan = document.getElementById("kegiatan").value.trim();
    const status = document.getElementById("status").value;

    // ngosongin pesan error
    document.getElementById("errorNama").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("error-kelas").textContent = "";
    document.getElementById("errorJurusan").textContent = "";
    document.getElementById("errorKegiatan").textContent = "";

    // verifikasi dua langkah kolom kosong
    if (nama === "") { document.getElementById("errorNama").textContent = "Nama wajib diisi!"; valid = false; }
    if (email === "") { document.getElementById("errorEmail").textContent = "Email wajib diisi!"; valid = false; }
    if (kelas === "") { document.getElementById("error-kelas").textContent = "Kelas wajib dipilih!"; valid = false; }
    if (jurusan === "") { document.getElementById("errorJurusan").textContent = "Jurusan wajib dipilih!"; valid = false; }
    if (kegiatan === "") { document.getElementById("errorKegiatan").textContent = "Kegiatan wajib diisi!"; valid = false; }

    if (valid) {
        if (idHidden) {
            // edit mode
            daftarPendaftar = daftarPendaftar.map(peserta => {
                if (peserta.id === idHidden) {
                    return { id: idHidden, nama, email, kelas, jurusan, kegiatan, status };
                }
                return peserta;
            });
            alert("Data berhasil diperbarui!");
        } else {
            // buat data baru make id
            const idBaru = Date.now().toString();
            daftarPendaftar.push({ id: idBaru, nama, email, kelas, jurusan, kegiatan, status });
            alert("Pendaftaran berhasil!");
        }

        // Save ke localstorage
        localStorage.setItem("daftarPendaftar", JSON.stringify(daftarPendaftar));

        // Display sukses
        document.getElementById("hasil").innerHTML = `
            <h3>Konfirmasi Pengiriman Berhasil</h3>
            <p>Nama: ${nama}</p>
            <p>Email: ${email}</p>
        `;

        // Reset form trus kembalike form pas udh selesai
        form.reset();
        tombol.disabled = true;
        window.location.href = "pages/dashboard.html";
    }
});
