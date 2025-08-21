let datiTabella = [];

// Carica il file JSON con i numeri estratti
fetch('table_clean.json')
    .then(response => response.json())
    .then(json => {
        datiTabella = json.data;
    })
    .catch(() => {
        document.getElementById('risultato').innerHTML = '<span class="fail">Errore nel caricamento dei dati.</span>';
    });

function verificaNumeri() {
    const input = document.getElementById('input-numeri').value;
    const numeri = input.split(',').map(n => n.trim()).filter(n => n);
    const risultati = [];

    numeri.forEach(numero => {
        let trovato = false;
        let dettagli = '';
        for (const entry of datiTabella) {
            if (entry.includes(numero)) {
                trovato = true;
                dettagli = entry.filter(e => e !== numero).join(' — ');
                break;
            }
        }
        if (trovato) {
            risultati.push(`<span class='success'>✅ Numero <b>${numero}</b> VINCENTE!</span><div class='match-details'>${dettagli}</div>`);
        } else {
            risultati.push(`<span class='fail'>❌ Numero <b>${numero}</b> NON vincente.</span>`);
        }
    });

    document.getElementById('risultato').innerHTML = risultati.join('<hr>');
}
