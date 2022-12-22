export const errorHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || err?.status || 500
  const message = err?.message || 'Internal Server Error'
  const realStatus =
    message.includes('is required') || message.includes('must be')
      ? 400
      : statusCode
  res.status(realStatus).json({
    success: false,
    status: realStatus,
    message: message
  })
}
