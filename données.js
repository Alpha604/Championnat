// Données des tournois au format JSON-like
const tournamentsData = {
    tournaments: [
        {
            id: 1,
            title: "Swiss OpenFront Championship 2026",
            type: "swiss",
            game: "OpenFront",
            date: "8 Janv 2026",
            location: "Lille, France",
            participants: 8,
            status: "en-attente",
            iframeUrl: "https://challonge.com/fr/4tnu9k5t/module",
            tournamentUrl: "https://challonge.com/fr/4tnu9k5t",
            participantsList: [
                { id: 1, name: "Victor", rank: "Participant", country: "🇫🇷", score: "0 pts" },
                { id: 2, name: "Gaspard", rank: "Participant", country: "🇫🇷", score: "0 pts" },
                { id: 3, name: "Roméo", rank: "Participant", country: "🇫🇷", score: "0 pts" },
                { id: 4, name: "Kylian", rank: "Participant", country: "🇫🇷", score: "0 pts" },
                { id: 5, name: "Basile", rank: "Participant", country: "🇫🇷", score: "0 pts" },
                { id: 6, name: "Esteban", rank: "Participant", country: "🇩🇪", score: "0 pts" }
            ],
            description: "Tournoi OpenFront officiel 2026. Format suisse avec 8 participants. Les matchs se dérouleront en ligne avec diffusion en direct."
        },
        {
            id: 2,
            title: "World Gaming Masters 2026",
            type: "elimination",
            game: "Valorant",
            date: "15 Fév 2026",
            location: "Paris, France",
            participants: 16,
            status: "upcoming",
            iframeUrl: "https://challonge.com/fr/example1/module",
            tournamentUrl: "https://challonge.com/fr/example1",
            participantsList: [
                { id: 1, name: "Team Alpha", rank: "1ère place", country: "🇫🇷", score: "2500 pts" },
                { id: 2, name: "Team Beta", rank: "2ème place", country: "🇩🇪", score: "2300 pts" },
                { id: 3, name: "Team Gamma", rank: "3ème place", country: "🇺🇸", score: "2100 pts" },
                { id: 4, name: "Team Delta", rank: "Participant", country: "🇬🇧", score: "1900 pts" }
            ],
            description: "Championnat du monde de Valorant 2026. Format élimination directe avec 16 équipes internationales."
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