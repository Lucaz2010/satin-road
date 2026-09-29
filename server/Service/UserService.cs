using Infra;
using Infra.Entities;

namespace API.Controllers;

public class UserService (SatinRoadDbConnection db)
{
    public List<User> GetUsers()
    {
        return db.Users.ToList();
    }
}


