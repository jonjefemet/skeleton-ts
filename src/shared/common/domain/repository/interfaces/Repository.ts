export default interface Repository<T, U> {
    start( port: T ): Promise<U>;
}