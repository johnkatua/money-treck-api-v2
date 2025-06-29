export const successResponse = <T>(res: any, data: T, status: number = 200) => {
    return res.status(status).json({
        success: true,
        data
    })
}