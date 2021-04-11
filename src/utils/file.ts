import fs from "fs";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteFile = async (filename: string) => {
  try {
    // Verifica se existe o arquivo
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  // Exclui o arquivo se já existir
  await fs.promises.unlink(filename);
};
