    let setuju = document.getElementById("setuju");
    console.log("Setuju:", setuju);

// untuk perubahan checkbox
    setuju.addEventListener("change", function() {
    submit.disabled = !setuju.checked;
    });


const form = document.getElementById("form");

// untuk tombol submit
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let valid = true;

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const kelas = document.getElementById("kelas").value;
    const jurusan = document.getElementById("jurusan").value;
    const status = document.getElementById("status").value;

    console.log("Nama".nama);
    console.log("Email".email);
    console.log("Kelas".kelas);
    console.log("Jurusan".jurusan);
    console.log("Kegiatan".kegiatan);
    console.log("Status".status);


    document.getElementById("errorNama").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("error-kelas").textContent = "";
    document.getElementById("errorJurusan").textContent = "";

    if (nama === "") {
        document.getElementById("errorNama").textContent = "Nama wajib diisi!";
        valid = false;
    }

    if (email === "") {
        document.getElementById("errorEmail").textContent = "Email wajib diisi!";
        valid = false;
    }

    if (kelas === "") {
        document.getElementById("error-kelas").textContent = "Pilih kelas!";
        valid = false;
    }

    if (jurusan === "") {
        document.getElementById("errorJurusan").textContent = "Pilih jurusan!";
        valid = false;
    }

    if (valid) {
        document.getElementById("hasil").innerHTML = `
            <h3>Pendaftaran Berhasil</h3>
            <p>Nama: ${nama}</p>
            <p>Email: ${email}</p>
            <p>Kelas: ${kelas}</p>
            <p>Jurusan: ${jurusan}</p>
        `;
    }



        const tombol = document.getElementById("submit");
    const form = document.getElementById("form");

        form.reset();
    tombol.disabled = true;
    
});