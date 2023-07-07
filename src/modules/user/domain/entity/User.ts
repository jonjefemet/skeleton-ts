import { Column, Entity } from "typeorm";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";

@Entity({ name: "admin_user", schema: "admin" })
export default class User extends DefaultEntity {

    @Column({ type: "varchar", length: 50, name: "username", unique: true })
      username: string;

    @Column({ type: "varchar", length: 50, name: "password" })
      password: string;

}