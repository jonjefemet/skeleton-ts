import { Entity, Column, OneToMany } from "typeorm";
import Task from "../../../taks/domain/entity/Task";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";

@Entity({ name: "location", schema: "task_management" })
export default class Location extends DefaultEntity {

  @Column({ name: "name", type: "varchar" })
    name: string;

  @Column({ name: "name", type: "varchar" })
    address: string;

  @OneToMany(() => Task, task => task.location )
    tasks: Task[];

}
