import { NextRequest } from "next/server"
import Busboy from "busboy"
import { Readable } from "stream"


export default async function parseFormData(req: NextRequest): Promise<{ buffer: Buffer; fileName: string } | null> {
	return new Promise((resolve, reject) => {
		const headers = {
			"content-type": req.headers.get("content-type") || "",
			"content-length": req.headers.get("content-length") || "",
		}
  
		const busboy = Busboy({ headers })
		const fileBuffer: Buffer[] = []
		let fileName = ""
  
		busboy.on("file", (_, file, info) => {
			fileName = info.filename
			file.on("data", (data) => {
				fileBuffer.push(data) 
			})
		})
  
		busboy.on("finish", () => {
			if (fileBuffer.length > 0 && fileName) {
				resolve({ buffer: Buffer.concat(fileBuffer), fileName })
			} else {
				resolve(null) 
			}
		})
  
		busboy.on("error", (error) => {
			reject(new Error(`Erro ao processar o arquivo: ${error}`))
		})
  
		const stream = Readable.fromWeb(req.body as any) 
		stream.pipe(busboy)
	})
}