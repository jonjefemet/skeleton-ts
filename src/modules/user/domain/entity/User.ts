import { UserProps } from "../dto/userProps";

export default class User implements UserProps {

    constructor(props?: UserProps) {
        this.id = props.id;
        this.user = props.user;
        this.password = props.password;
        this.firtsName = props.firtsName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.age = props.age;
    }

    public get id(): string {
        return this.id;
    }
    public set id(value: string) {
        this.id = value;
    }

    public get user(): string {
        return this.user;
    }
    public set user(value: string) {
        this.user = value;
    }

    public get password(): string {
        return this.password;
    }
    public set password(value: string) {
        this.password = value;
    }

    public get firtsName(): string {
        return this.firtsName;
    }
    public set firtsName(value: string) {
        this.firtsName = value;
    }

    public get lastName(): string {
        return this.lastName;
    }
    public set lastName(value: string) {
        this.lastName = value;
    }

    public get email(): string {
        return this.email;
    }
    public set email(value: string) {
        this.email = value;
    }

    public get age(): number {
        return this.age;
    }
    public set age(value: number) {
        this.age = value;
    }
}