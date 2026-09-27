const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(function (error) {
            next(error);
        });
    };
};

export { asyncHandler };