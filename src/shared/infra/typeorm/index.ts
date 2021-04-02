import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (localhost = "database"): Promise<Connection> => {
    const defaultOPtions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOPtions, {
            localhost,
        })
    );
};