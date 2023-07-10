import { Entity, Column, OneToMany } from "typeorm";
import Task from "../../../taks/domain/entity/Task";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";

@Entity({ name: "business", schema: "task_management" })
export default class Business extends DefaultEntity {

  @Column({ name: "name", type: "varchar" })
    name: string;

  @OneToMany(() => Task, task => task.business )
    tasks: Task[];

}
