// Importer les données (s'assurer que données.js est chargé avant ce fichier)
// Dans votre HTML: <script src="../données.js"></script>
// <script src="script.js"></script>

// Éléments DOM
const tournamentsContainer = document.getElementById('tournaments-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('tournament-modal');
const participantsModal = document.getElementById('participants-modal');
const closeModalBtn = document.getElementById('close-modal');
const closeParticipantsBtn = document.getElementById('close-participants');
const tournamentIframe = document.getElementById('tournament-iframe');
const iframeLoading = document.getElementById('iframe-loading');
const modalTitle = document.getElementById('modal-tournament-title');
const participantsTitle = document.getElementById('participants-title');
const participantsBody = document.getElementById('participants-body');
const refreshIframeBtn = document.getElementById('refresh-iframe');
const openNewTabBtn = document.getElementById('open-new-tab');
const viewParticipantsFromModalBtn = document.getElementById('view-participants-from-modal');
const currentTournamentInfo = document.getElementById('current-tournament-info');

let currentTournament = null;

// Générer les cartes de tournois
function renderTournaments(filter = 'all') {
    tournamentsContainer.innerHTML = '';
    
    // Utiliser les données du fichier données.js
    let filteredTournaments;
    if (filter === 'all') {
        filteredTournaments = tournamentsData.getAllTournaments();
    } else {
        filteredTournaments = tournamentsData.getTournamentsByType(filter);
    }
    
    filteredTournaments.forEach((tournament, index) => {
        const card = document.createElement('div');
        card.className = 'tournament-card';
        card.setAttribute('data-id', tournament.id);
        card.setAttribute('data-type', tournament.type);
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Obtenir les informations de statut
        const statusInfo = tournamentsData.getStatusInfo(tournament.status);
        const statusClass = `status-${tournament.status.replace('-', '')}`;
        
        card.innerHTML = `
            <div class="tournament-header">
                <span class="tournament-type">Tournoi ${tournamentsData.getTypeName(tournament.type)}</span>
                <h3 class="tournament-title">${tournament.title}</h3>
                <p class="tournament-game">${tournament.game}</p>
            </div>
            <div class="tournament-details">
                <div class="tournament-info">
                    <i class="far fa-calendar-alt"></i>
                    <span>${tournament.date}</span>
                </div>
                <div class="tournament-info">
                    <i class="fa-solid fa-crown"></i>
                    <span>${tournament.winner}</span>
                </div>
                <div class="tournament-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${tournament.location}</span>
                </div>
                <div class="tournament-info">
                    <i class="fa-solid fa-khanda"></i>
                    <span>${tournament.next}</span>
                </div>
                <div class="tournament-participants">
                    <div class="participants-count" data-id="${tournament.id}">
                        <i class="fas fa-users"></i>
                        <span>${tournament.participants} participants</span>
                    </div>
                    <span class="tournament-status ${statusClass}" style="color: ${statusInfo.color}">${statusInfo.text}</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn view-participants-btn" data-id="${tournament.id}">
                        <i class="fas fa-user-friends"></i> Participants
                    </button>
                    <button class="action-btn view-site-btn" data-id="${tournament.id}">
                        <i class="fas fa-external-link-alt"></i> Site
                    </button>
                </div>
            </div>
        `;
        
        // Ajouter l'événement de clic pour ouvrir le modal iframe (carte entière)
        card.addEventListener('click', (e) => {
            // Ne pas ouvrir si on clique sur les boutons d'action
            if (!e.target.closest('.card-actions') && !e.target.closest('.participants-count')) {
                openTournamentModal(tournament);
            }
        });
        
        tournamentsContainer.appendChild(card);
    });
    
    // Ajouter les événements aux boutons
    attachButtonEvents();
}

// Attacher les événements aux boutons
function attachButtonEvents() {
    // Boutons "Voir Participants"
    document.querySelectorAll('.view-participants-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tournamentId = parseInt(btn.getAttribute('data-id'));
            const tournament = tournamentsData.getTournamentById(tournamentId);
            if (tournament) {
                openParticipantsModal(tournament);
            }
        });
    });
    
    // Boutons "Site du Tournoi"
    document.querySelectorAll('.view-site-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tournamentId = parseInt(btn.getAttribute('data-id'));
            const tournament = tournamentsData.getTournamentById(tournamentId);
            if (tournament && tournament.tournamentUrl) {
                window.open(tournament.tournamentUrl, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Boutons "Voir Participants" dans la section participants
    document.querySelectorAll('.participants-count').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tournamentId = parseInt(btn.getAttribute('data-id'));
            const tournament = tournamentsData.getTournamentById(tournamentId);
            if (tournament) {
                openParticipantsModal(tournament);
            }
        });
    });
}

// Ouvrir le modal avec l'iframe Challonge
function openTournamentModal(tournament) {
    currentTournament = tournament;
    modalTitle.textContent = tournament.title;
    currentTournamentInfo.textContent = `${tournament.game} • ${tournament.date} • ${tournament.participants} participants`;
    
    iframeLoading.style.display = 'flex';
    tournamentIframe.style.display = 'none';
    
    // Afficher le modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Charger l'iframe Challonge
    setTimeout(() => {
        tournamentIframe.src = tournament.iframeUrl;
        
        // Quand l'iframe est chargée, cacher l'indicateur de chargement
        tournamentIframe.onload = () => {
            setTimeout(() => {
                iframeLoading.style.display = 'none';
                tournamentIframe.style.display = 'block';
                
                // Appliquer un léger zoom pour améliorer la lisibilité
                tournamentIframe.style.transform = 'scale(1.02)';
                tournamentIframe.style.transformOrigin = 'top left';
            }, 500);
        };
        
        // Gestion des erreurs de chargement
        tournamentIframe.onerror = () => {
            iframeLoading.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>Erreur de chargement du tournoi</span>
                <button class="iframe-btn" onclick="location.reload()" style="margin-top: 1rem;">
                    <i class="fas fa-redo"></i> Réessayer
                </button>
            `;
        };
    }, 300);
}

// Ouvrir le modal des participants
function openParticipantsModal(tournament) {
    participantsTitle.textContent = `Participants - ${tournament.title}`;
    
    // Générer le contenu des participants
    let participantsHTML = '';
    const statusInfo = tournamentsData.getStatusInfo(tournament.status);
    
    // Résumé du tournoi
    participantsHTML += `
        <div class="tournament-summary">
            <h3 style="color: #4cc9f0; margin-bottom: 1rem;">${tournament.title}</h3>
            <p style="color: #b8c2cc; margin-bottom: 1rem;">${tournament.description || 'Aucune description disponible.'}</p>
            <div class="summary-item">
                <span class="summary-label">Format:</span>
                <span class="summary-value">${tournamentsData.getTypeName(tournament.type)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Date:</span>
                <span class="summary-value">${tournament.date}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Lieu:</span>
                <span class="summary-value">${tournament.location}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Participants:</span>
                <span class="summary-value">${tournament.participants}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Statut:</span>
                <span class="summary-value" style="color: ${statusInfo.color}">${statusInfo.text}</span>
            </div>
        </div>
    `;
    
    if (tournament.participantsList && tournament.participantsList.length > 0) {
        participantsHTML += '<div class="participants-list">';
        tournament.participantsList.forEach((participant, index) => {
            participantsHTML += `
                <div class="participant-item">
                    <div class="participant-rank">#${index + 1} - ${participant.rank}</div>
                    <div class="participant-name">${participant.name} ${participant.country}</div>
                    <div class="participant-info">
                        <i class="fas fa-chart-line"></i>
                        <span>${participant.score}</span>
                    </div>
                </div>
            `;
        });
        participantsHTML += '</div>';
    } else {
        participantsHTML += `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-user-slash" style="font-size: 3rem; color: #4cc9f0; margin-bottom: 1rem;"></i>
                <h3 style="color: #a9b7c6;">Liste des participants non disponible</h3>
                <p>Les participants seront annoncés prochainement.</p>
            </div>
        `;
    }
    
    participantsBody.innerHTML = participantsHTML;
    
    // Afficher le modal
    participantsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Fermer le modal iframe
function closeModal() {
    modal.style.display = 'none';
    tournamentIframe.src = '';
    tournamentIframe.style.transform = 'scale(1)';
    document.body.style.overflow = 'auto';
}

// Fermer le modal participants
function closeParticipantsModal() {
    participantsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Afficher tous les tournois au départ
    renderTournaments();
    
    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            // Filtrer les tournois
            renderTournaments(button.getAttribute('data-filter'));
        });
    });
    
    // Fermer les modals
    closeModalBtn.addEventListener('click', closeModal);
    closeParticipantsBtn.addEventListener('click', closeParticipantsModal);
    
    // Fermer les modals quand on clique en dehors du contenu
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    participantsModal.addEventListener('click', (e) => {
        if (e.target === participantsModal) {
            closeParticipantsModal();
        }
    });
    
    // Bouton d'actualisation de l'iframe
    refreshIframeBtn.addEventListener('click', () => {
        if (currentTournament) {
            iframeLoading.style.display = 'flex';
            tournamentIframe.style.display = 'none';
            tournamentIframe.src = currentTournament.iframeUrl + '?t=' + Date.now(); // Cache busting
        }
    });
    
    // Bouton pour ouvrir dans un nouvel onglet
    openNewTabBtn.addEventListener('click', () => {
        if (currentTournament && currentTournament.tournamentUrl) {
            window.open(currentTournament.tournamentUrl, '_blank', 'noopener,noreferrer');
        }
    });
    
    // Bouton pour voir les participants depuis le modal
    viewParticipantsFromModalBtn.addEventListener('click', () => {
        if (currentTournament) {
            closeModal();
            setTimeout(() => {
                openParticipantsModal(currentTournament);
            }, 300);
        }
    });
    
    // Fermer les modals avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.style.display === 'flex') {
                closeModal();
            }
            if (participantsModal.style.display === 'flex') {
                closeParticipantsModal();
            }
        }
    });
});