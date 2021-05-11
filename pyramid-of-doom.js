const PlayerService = {
  getPlayerTeamId: function(playerId) {
    return fetch(`/player/${playerId}/team`);
  },
  getPlayers: function(teamId) {
    return fetch(`/team/${teamId}/player`);
  }
};

const PlayerDetailsController = {
  playerId: 8,
  showTeammatesClick: async function() {
    const teamId = await PlayerService.getPlayerTeamId(this.playerId);
    const playerList = await PlayerService.getPlayers(teamId);

    // Render playerList
  }
};

