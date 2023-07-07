import { Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
export default abstract class DefaultEntity {

    @PrimaryGeneratedColumn( "uuid" )
      id: string;
   
    @CreateDateColumn({ name: "created_at" })
      createdAt: Date;
   
    @Column( "varchar", { length: 50 })
      createdBy: string;
   
    @UpdateDateColumn({ name: "updated_at" })
      updatedAt: Date;
   
    @Column( "varchar", { length: 50 })
      updatedBy: string;
   
    @Column( "bool", { default: "true" })
      active: boolean;

}