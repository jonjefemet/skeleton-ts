import { Entity, Column, ManyToOne } from "typeorm";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";
import Task from "../../../taks/domain/entity/Task";

@Entity({ name: "task_completion", schema: "task_management" })
export default class TaskCompletion extends DefaultEntity {

  @Column({ name: "completion_date", type: "date" })
    completionDate: Date;

  @Column({ name: "completed", type: "boolean" })
    completed: boolean;

  @ManyToOne(() => Task, task => task.completions )
    task: Task;

}
