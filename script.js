/*document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById('registration-form');

    if(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const eta = document.getElementById('eta').value;
            const area = document.getElementById('area').value;
            const disponibilita = document.getElementById('disponibilita').value;
            const esperienze = document.getElementById('esperienze').value;
            const motivazione = document.getElementById('motivazione').value;

            //VALIDAZIONE
            let allertString = "";

            const patternName = /^[A-Z]{1}[A-z]+\s*?[A-Z]{1}\W?[A-Z]?[a-z]+/;
            if(!patternName.test(nome)){
                allertString += "-Nome non valido, il nome deve iniziare con una lettera maiuscola\n";
            }

            const patternEmail = /^\w+\.?\w+?\@{1}[A-z]{1,}\.{1}[A-z]{2,}$/;
            if(!patternEmail.test(email)){
                allertString += "-Email non valida, formato richiesto: esempio@email.com\n";
            }

            const patternTelefono = /(\+39\s)?3\d{2}\-?\d{7}$/;
            if(!patternTelefono.test(telefono)){
                allertString += "-Telefono non valido, formato: +39 123 456 7890\n";
            }

            const patternEta = /\d{2,3}/;
            if(!patternEta.test(eta) || eta < 18){
                allertString += "-Età non valida, devi essere maggiorenne\n";
            }

            if(allertString !== ""){
                alert(allertString);
                return;
            }

            const btnSubmit = document.getElementById('btn-submit');
            const messaggioRisposta = document.getElementById('messaggio-risposta');

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Invio in corso...';
            messaggioRisposta.style.display = 'none';

            const datiForm = new FormData();
            datiForm.append('nome', nome);
            datiForm.append('email', email);
            datiForm.append('telefono', telefono);
            datiForm.append('eta', eta);
            datiForm.append('area', area);
            datiForm.append('disponibilita', disponibilita);
            datiForm.append('esperienze', esperienze);
            datiForm.append('motivazione', motivazione);

            try {
                console.log('Invio dati al server...');

                const risposta = await fetch('registrazione.php', {
                    method: 'POST',
                    body: datiForm
                });

                console.log('Risposta ricevuta:', risposta.status);

                const risultato = await risposta.json();
                console.log('Dati JSON:', risultato);

                messaggioRisposta.style.display = 'block';

                if(risultato.successo) {
                    messaggioRisposta.className = 'alert alert-success mt-3';
                    messaggioRisposta.innerHTML = '<i class="fas fa-check-circle me-2"></i>' + risultato.messaggio;
                    form.reset();
                } else {
                    messaggioRisposta.className = 'alert alert-danger mt-3';
                    let msg = '<i class="fas fa-exclamation-circle me-2"></i>' + risultato.messaggio;

                    if(risultato.debug) {
                        msg += '<br><small>Debug: ' + risultato.debug + '</small>';
                    }

                    messaggioRisposta.innerHTML = msg;
                }

            } catch (errore) {
                messaggioRisposta.style.display = 'block';
                messaggioRisposta.className = 'alert alert-danger mt-3';
                messaggioRisposta.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Errore di connessione. Riprova più tardi.';
                console.error('Errore:', errore);
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Invia Richiesta';
            }
        });
    }
    
    const contentContainer = document.getElementById('content-container');
    if(contentContainer) {
        loadContent('introduzione.html');

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                this.classList.add('active');
                const href = this.getAttribute('href');
                loadContent(href);
            });
        });
    }

    function loadContent(url) {
        const container = document.getElementById('content-container');
        if(!container) return;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;

                document.querySelectorAll('.image-card').forEach(card => {
                    card.addEventListener('click', function(e) {
                        e.preventDefault();
                        const target = this.getAttribute('href');

                        document.querySelectorAll('.nav-link').forEach(navLink => {
                            navLink.classList.remove('active');
                            if(navLink.getAttribute('href') === target) {
                                navLink.classList.add('active');
                            }
                        });

                        loadContent(target);
                    });
                });

                document.querySelectorAll('.btn[href]').forEach(button => {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        const target = this.getAttribute('href');

                        document.querySelectorAll('.nav-link').forEach(navLink => {
                            navLink.classList.remove('active');
                            if(navLink.getAttribute('href') === target) {
                                navLink.classList.add('active');
                            }
                        });

                        loadContent(target);
                    });
                });
            })
            .catch(error => {
                console.error('Errore nel caricamento del contenuto:', error);
            });
    }
});*/
document.addEventListener("DOMContentLoaded", function() {

    const contentContainer = document.getElementById('content-container');
    if(contentContainer) {
        loadContent('introduzione.html');

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                this.classList.add('active');
                const href = this.getAttribute('href');
                loadContent(href);
            });
        });
    }

    function loadContent(url) {
        const container = document.getElementById('content-container');
        if(!container) return;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;

                // Dopo aver caricato il contenuto, inizializza i componenti necessari
                if(url === 'registrazione.html') {
                    initRegistrationForm();
                }

                // Gestione image-card
                document.querySelectorAll('.image-card').forEach(card => {
                    card.addEventListener('click', function(e) {
                        e.preventDefault();
                        const target = this.getAttribute('href');

                        document.querySelectorAll('.nav-link').forEach(navLink => {
                            navLink.classList.remove('active');
                            if(navLink.getAttribute('href') === target) {
                                navLink.classList.add('active');
                            }
                        });

                        loadContent(target);
                    });
                });

                // Gestione bottoni con href (es. "Registrati Ora") — escludi quelli dentro form
                document.querySelectorAll('.btn[href]').forEach(button => {
                    if(button.type === 'submit' || button.closest('form')) return;
                    const target = button.getAttribute('href');
                    if(!target || !target.endsWith('.html')) return;

                    button.addEventListener('click', function(e) {
                        e.preventDefault();

                        document.querySelectorAll('.nav-link').forEach(navLink => {
                            navLink.classList.remove('active');
                            if(navLink.getAttribute('href') === target) {
                                navLink.classList.add('active');
                            }
                        });

                        loadContent(target);
                    });
                });
            })
            .catch(error => {
                console.error('Errore nel caricamento del contenuto:', error);
            });
    }

    function initRegistrationForm() {
        const form = document.getElementById('registration-form');
        if(!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();

            const nome          = document.getElementById('nome').value;
            const email         = document.getElementById('email').value;
            const telefono      = document.getElementById('telefono').value;
            const eta           = document.getElementById('eta').value;
            const area          = document.getElementById('area').value;
            const disponibilita = document.getElementById('disponibilita').value;
            const esperienze    = document.getElementById('esperienze').value;
            const motivazione   = document.getElementById('motivazione').value;

            // VALIDAZIONE
            let allertString = "";

            const patternName = /^[A-Z]{1}[A-z]+\s*?[A-Z]{1}\W?[A-Z]?[a-z]+/;
            if(!patternName.test(nome)){
                allertString += "- Nome non valido, deve iniziare con una lettera maiuscola\n";
            }

            const patternEmail = /^\w+\.?\w+?\@{1}[A-z]{1,}\.{1}[A-z]{2,}$/;
            if(!patternEmail.test(email)){
                allertString += "- Email non valida, formato richiesto: esempio@email.com\n";
            }

            const patternTelefono = /(\+39\s)?3\d{2}\-?\d{7}$/;
            if(!patternTelefono.test(telefono)){
                allertString += "- Telefono non valido, formato: +39 123 456 7890\n";
            }

            const patternEta = /\d{2,3}/;
            if(!patternEta.test(eta) || eta < 18){
                allertString += "- Età non valida, devi essere maggiorenne\n";
            }

            if(allertString !== ""){
                alert(allertString);
                return;
            }

            const btnSubmit = document.getElementById('btn-submit');
            const messaggioRisposta = document.getElementById('messaggio-risposta');

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Invio in corso...';
            messaggioRisposta.style.display = 'none';

            const datiForm = new FormData();
            datiForm.append('nome', nome);
            datiForm.append('email', email);
            datiForm.append('telefono', telefono);
            datiForm.append('eta', eta);
            datiForm.append('area', area);
            datiForm.append('disponibilita', disponibilita);
            datiForm.append('esperienze', esperienze);
            datiForm.append('motivazione', motivazione);

            try {
                const risposta = await fetch('registrazione.php', {
                    method: 'POST',
                    body: datiForm
                });

                const risultato = await risposta.json();

                messaggioRisposta.style.display = 'block';

                if(risultato.successo) {
                    messaggioRisposta.className = 'alert alert-success mt-3';
                    messaggioRisposta.innerHTML = '<i class="fas fa-check-circle me-2"></i>' + risultato.messaggio;
                    form.reset();
                } else {
                    messaggioRisposta.className = 'alert alert-danger mt-3';
                    let msg = '<i class="fas fa-exclamation-circle me-2"></i>' + risultato.messaggio;
                    if(risultato.debug) {
                        msg += '<br><small>Debug: ' + risultato.debug + '</small>';
                    }
                    messaggioRisposta.innerHTML = msg;
                }

            } catch (errore) {
                messaggioRisposta.style.display = 'block';
                messaggioRisposta.className = 'alert alert-danger mt-3';
                messaggioRisposta.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Errore di connessione. Riprova più tardi.';
                console.error('Errore:', errore);
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Invia Richiesta';
            }
        });
    }

});