import fs from "fs/promises";
import path from "path";

export async function loadData<T>(fileName: string): Promise<T[]> {
  const filePath = path.join(process.cwd(), "app/shared/data", fileName);

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const parsedData: unknown = JSON.parse(data);

    if (Array.isArray(parsedData)) {
      return parsedData as T[];
    } else {
      console.warn(`The data in ${fileName} is not an array.`);
      return [];
    }
  } catch (error) {
    console.error(`Error loading data from ${fileName}:`, error);
    return [];
  }
}
