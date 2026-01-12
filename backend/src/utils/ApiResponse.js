class ApiResponse {
    constructor(statuscode, data, message){
        this.message = message
        this.data = data,
        this.success = true,
        this.statuscode = statuscode < 400
    }
};

export {ApiResponse}