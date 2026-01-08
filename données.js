// Données des tournois au format JSON-like
const tournamentsData = {
    tournaments: [
        {
            id: 1,
            title: "OpenFront Championship 2026",
            type: "elimination",
            game: "OpenFront",
            winner: "No",
            date: "8 Janv 2026",
            location: "Lille, France",
            next: "Basile | Gaspard",
            participants: 8,
            status: "en-attente",
            iframeUrl: "https://challonge.com/fr/4tnu9k5t/module",
            tournamentUrl: "https://challonge.com/fr/4tnu9k5t",
            participantsList: [
                { id: "#", name: "Victor", rank: "Participant", country: "", score: "0 pts" },
                { id: "#", name: "Gaspard", rank: "Participant", country: "", score: "0 pts" },
                { id: 1, name: "Roméo", rank: "Alpha", country: "🇦🇱", score: "🇦🇱 0 pts" },
                { id: "#", name: "Kylian", rank: "Participant", country: "", score: "0 pts" },
                { id: "#", name: "Basile", rank: "Participant", country: "", score: "0 pts" },
                { id: "#", name: "Esteban", rank: "Participant", country: "", score: "0 pts" }
            ],
            description: "Tournoi OpenFront officiel 2026. Format simple élimination avec 8 participants en équipe de 2. Les matchs se dérouleront en ligne avec diffusion en direct."
        },
        {
            id: 2,
            title: "Chess Tour 2026",
            type: "elimination",
            game: "Echecs",
            winner: "No",
            date: "15 Fév 2026",
            location: "Lille, France",
            next: "attente",
            participants: "?",
            status: "upcoming",
            iframeUrl: "https://challonge.com/fr/example1/module",
            tournamentUrl: "https://challonge.com/fr/example1",
            participantsList: [],
            description: "Championnat du C R-B d'Echecs 2026. Format élimination directe avec 2 équipes."
        }
    ],
    
    // Méthodes utilitaires pour accéder aux données
    getAllTournaments: function() {
        return this.tournaments;
    },
    
    getTournamentById: function(id) {
        return this.tournaments.find(t => t.id === id);
    },
    
    getTournamentsByType: function(type) {
        return this.tournaments.filter(t => t.type === type);
    },
    
    getTournamentsByStatus: function(status) {
        return this.tournaments.filter(t => t.status === status);
    },
    
    // Méthodes pour formater les données
    getTypeName: function(type) {
        const typeNames = {
            'swiss': 'Swiss',
            'elimination': 'Élimination',
            'roundrobin': 'Round Robin'
        };
        return typeNames[type] || type;
    },
    
    getStatusInfo: function(status) {
        const statusInfo = {
            'en-attente': { text: 'En attente', color: '#ffc107' },
            'upcoming': { text: 'À venir', color: '#4cc9f0' },
            'ongoing': { text: 'En cours', color: '#e94560' },
            'completed': { text: 'Terminé', color: '#2a9d8f' }
        };
        return statusInfo[status] || { text: status, color: '#a9b7c6' };
    }
};

// Exporter pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = tournamentsData;
}
