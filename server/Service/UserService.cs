using Infra;
using Infra.Entities;

namespace Service;

public class UserService (SatinRoadDbConnection db)
{
    public List<User> GetUsers()
    {
        return db.Users.ToList();
    }
}


