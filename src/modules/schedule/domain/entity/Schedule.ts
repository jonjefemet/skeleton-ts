import { Entity, Column, OneToMany } from "typeorm";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";
import Task from "../../../taks/domain/entity/Task";

@Entity({ name: "schedule", schema: "task_management" })
export default class Schedule extends DefaultEntity {

  @Column({ name: "schedule_type", type: "varchar" })
    scheduleType: string;

  @Column({ name: "weekdays", type: "text", array: true })
    weekdays: string[];

  @Column({ name: "start_date", type: "date" })
    startDate: Date;

  @Column({ name: "end_date", type: "date" })
    endDate: Date;

  @OneToMany(() => Task, task => task.schedule )
    tasks: Task[];

}
