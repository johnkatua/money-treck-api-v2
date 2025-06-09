export const errorHandler = (error: any) => {
    const errMsg = error instanceof Error ? error.message : "Unknown error"
    return errMsg
}