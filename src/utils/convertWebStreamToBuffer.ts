export default async function convertWebStreamToBuffer(webStream: ReadableStream): Promise<Buffer> {
	const chunks: Uint8Array[] = []
	const reader = webStream.getReader()

	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		chunks.push(value)
	}

	return Buffer.concat(chunks)
}