export default interface Repository<T, U> {
    excute(port: T): Promise<U>;
}