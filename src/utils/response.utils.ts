export const successResponse = <T>(res: any, data: T, status: number = 200) => {
    return res.status(status).json({
        success: true,
        data
    })
}

export const successMsgResponse = (res: any, msg: string, status: number = 200) => {
    return res.status(status).json({
        success: true,
        msg
    })
}