import { Entity, Column, OneToMany } from "typeorm";
import Task from "../../../taks/domain/entity/Task";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";

@Entity({ name: "employee", schema: "task_management" })
export default class Employee extends DefaultEntity {

  @Column({ name: "name", type: "varchar" })
    name: string;

  @Column({ name: "position", type: "varchar" })
    position: string;

  @OneToMany(() => Task, task => task.employees )
    tasks: Task[];

}
