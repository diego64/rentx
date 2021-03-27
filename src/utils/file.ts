import fs from "fs";

export const deleteFile = async (filename: string) => {
    try {
        //Verifica se existe o arquivo
        await fs.promises.stat(filename)
    }catch {
        return;
    }
    //Exclui o arquivo se já existir
    await fs.promises.unlink(filename);
}