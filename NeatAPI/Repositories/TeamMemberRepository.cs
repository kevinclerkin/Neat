using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;

namespace NeatAPI.Repositories
{
    public class TeamMemberRepository : ITeamMember
    {
        private readonly DataContext _context;

        public TeamMemberRepository(DataContext context)
        {
            _context = context;
        }

        

        public ICollection<TeamMember> GetTeamMembers()
        {
            return _context.TeamMembers.OrderBy(i => i.TeamMemberId).ToList();
        }

        public ICollection<string> GetTeamMemberNames()
        {
            return _context.TeamMembers.Select(i => i.FirstName).ToList();
        }
    }
}
