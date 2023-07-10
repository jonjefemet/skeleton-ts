import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import DefaultEntity from "../../../../shared/common/domain/entity/DefaultEntity";
import Employee from "../../../employee/domain/entity/Employee";
import Location from "../../../location/domain/entity/Location";
import Schedule from "../../../schedule/domain/entity/Schedule";
import TaskCompletion from "../../../taskCompletion/domain/entity/TaskCompletion";
import Business from "../../../business/domain/entity/Business";

@Entity({ name: "task", schema: "task_management" })
export default class Task extends DefaultEntity {

  @Column({ name: "name", type: "varchar" })
    name: string;

  @Column({ name: "description", type: "varchar" })
    description: string;

  @Column({ name: "status", type: "varchar" })
    status: string;

  @Column({ name: "dead_line", type: "date" })
    deadLine: Date;

  @OneToMany(() => Task, task => task.parentTask )
    subTasks: Task[];

  @OneToMany(() => TaskCompletion, completion => completion.task )
    completions: TaskCompletion[];

  @ManyToOne(() => Task, task => task.subTasks )
    parentTask: Task;

  @ManyToOne(() => Employee, employee => employee.tasks )
    employees: Employee[];

  @ManyToOne(() => Location, location => location.tasks )
    location: Location;

  @ManyToOne(() => Schedule, schedule => schedule.tasks )
    schedule: Schedule;

  @ManyToOne(() => Business, business => business.tasks )
    business: Business;

  assignEmployee( employee: Employee ): void {
    // Lógica para asignar un empleado a la tarea
  }

  removeEmployee( employee: Employee ): void {
    // Lógica para remover un empleado de la tarea
  }

  changeLocation( location: Location ): void {
    // Lógica para cambiar la ubicación de la tarea
  }

  changeSchedule( schedule: Schedule ): void {
    // Lógica para cambiar la programación de la tarea
  }

  addSubTask( task: Task ): void {
    // Lógica para agregar una sub tarea a la tarea principal
  }

  completeTask( completionDate: Date ): void {
    // Lógica para marcar la tarea como completada y registrar la fecha de completitud
  }

}
