using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
    public interface ITeamMember
    {
        ICollection<TeamMember> GetTeamMembers();

        ICollection<string> GetTeamMemberNames();

    }
}
