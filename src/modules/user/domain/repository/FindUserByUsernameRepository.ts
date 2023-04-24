import Repository from "../../../common/domain/repository/Repository";
import User from "../entity/User";

const USERS = [{
    id: "1",
    user: "jon",
    password: "123",
    firtsName: "Jonshua",
    lastName: "Raul",
    email: "jonshua@outlook.com",
    age: 1,
}]

export default class FindUserByUsernameRepository implements Repository<string, User>{

    async excute(port: string): Promise<User> {

        const user = USERS.find(user => port === user.user);

        if (!user) return null;

        return new User({ ...user })
    }

}