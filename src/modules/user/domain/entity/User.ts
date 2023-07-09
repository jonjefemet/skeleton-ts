import { Column, Entity } from "typeorm";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";

@Entity({ name: "user", schema: "admin" })
export default class User extends DefaultEntity {

    @Column({ type: "varchar", length: 50, name: "username", unique: true })
      username: string;

    @Column({ type: "varchar", length: 250, name: "password" })
      password: string;

}