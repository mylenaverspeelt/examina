import { useCallback, useRef } from "react"

export function useSingleRequest() {
	const isRequestInProgress = useRef(false)

	const executeSingleRequest = useCallback(async (requestFn: () => Promise<any>) => {
		if (isRequestInProgress.current) {
			return
		}

		try {
			isRequestInProgress.current = true
			const result = await requestFn()
			return result
		} finally {
			isRequestInProgress.current = false
		}
	}, [])

	return executeSingleRequest
}