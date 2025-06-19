export const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "SmartFit Pro API Documentation",
        version: "1.0.0",
        description: "This is the API documentation for the smartfit pro.",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local server",
        },

        // {
        //     url: "http://k8s-default-myapping-efd3e9e96e-1202088366.eu-west-2.elb.amazonaws.com",
        //     description: "Live server",
        // },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Enter your JWT token",
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

export const paths = {

    "/api/user/signup": {
        post: {
            summary: "User Signup",
            description:
                "Creates a new user account. If the user email exists but is not verified, a new OTP will be sent.",
            tags: ["User"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", format: "email", example: "user@example.com" },
                                phone_no: { type: "string", example: "1234567890" },
                                dob: { type: "string", format: "date", example: "1990-01-01" },
                                gender: { type: "string", example: "Male" },
                                password: { type: "string", format: "password", example: "SecurePassword123!" },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "User created successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "User Signup Successfully." },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Validation errors or existing user issues.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Email Already Exist." },
                                    is_verify: { type: "boolean", example: false },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: "Internal server error.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/api/user/login": {
        post: {
            summary: "User Login",
            description: "Allows a user to log in with their email and password. Returns a JWT token upon successful login.",
            tags: ["User"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", format: "email", example: "shubham.vishwakarma@saviesainfotech.com" },
                                password: { type: "string", format: "password", example: "Asdf@123" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login successful.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Logged In Successfully." },
                                    token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Validation error or password mismatch.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Password Not Match." },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: "User not found or not verified.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "User Not Exist." },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: "Internal server error.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/api/user/forget-password": {
        post: {
            summary: "Forgot Password",
            description: "Sends an OTP to the user's registered email to reset the password.",
            tags: ["User"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    format: "email",
                                    example: "user@example.com",
                                    description: "The email address of the user."
                                }
                            },
                            required: ["email"]
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "OTP sent successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "OTP Has Been Sent To Your Registered Email" },
                                    email: { type: "string", format: "email", example: "user@example.com" },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Validation error.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Email Must Be A Valid Email" },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: "User not found.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Email Not Exist" },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: "Internal server error.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/api/user/verify-otp": {
        post: {
            summary: "Verify OTP",
            description: "Verifies the OTP sent to the user's email for account verification or password reset.",
            tags: ["User"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    format: "email",
                                    example: "user@example.com",
                                    description: "The email address of the user.",
                                },
                                otp: {
                                    type: "integer",
                                    example: 1234,
                                    description: "The OTP sent to the user's email.",
                                },
                            },
                            required: ["email", "otp"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "OTP verified successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "OTP Verified Successfully" },
                                    email: { type: "string", format: "email", example: "user@example.com" },
                                    token: {
                                        type: "string",
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                        description: "The authentication token for the user.",
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Validation error or OTP mismatch.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: {
                                        type: "string",
                                        example: "OTP Does Not Matched",
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: "Email not found.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: {
                                        type: "string",
                                        example: "Email Not Exist",
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: "Internal server error.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    "/api/user/reset-password": {
        post: {
            summary: "Reset Password",
            description: "Reset the password for a user account.",
            tags: ["User"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    format: "email",
                                    example: "user@example.com",
                                },
                                password: {
                                    type: "string",
                                    example: "NewPassword123",
                                },
                            },
                            required: ["email", "password"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Password updated successfully." },
                404: { description: "Email not found." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/profile": {
        get: {
            summary: "Get User Profile",
            description: "Retrieve the profile information for the logged-in user.",
            tags: ["User"],
            // parameters: [
            //     {
            //         in: "header",
            //         name: "Authorization",
            //         required: true,
            //         schema: { type: "string" },
            //         description: "JWT token for authorization.",
            //     },
            // ],
            security: [
                {
                    BearerAuth: [], // Indicates this endpoint requires JWT
                },
            ],
            responses: {
                200: { description: "User profile retrieved successfully." },
                404: { description: "User profile not found." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/update-profile": {
        "put": {
            "summary": "Update User Profile",
            "description": "Update the profile information for the logged-in user.",
            "tags": ["User"],
            "security": [
                {
                    "BearerAuth": []
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": { "type": "string", "description": "Full name of the user" },
                                "nick_name": { "type": "string", "description": "Nickname of the user" },
                                "phone_no": { "type": "string", "description": "Phone number of the user" },
                                "measurement_unit": { "type": "string", "description": "Preferred measurement unit (e.g., metric or imperial)" },
                                "weight": {
                                    "type": "object",
                                    "description": "Weight of the user",
                                    "properties": {
                                        "value": { "type": "number", "description": "Weight value (e.g., st)" },
                                        "unit": { "type": "string", "description": "Unit of weight (e.g., lbs)" }
                                    },
                                    "example": { "st": 10, "ibs": 10 }
                                },
                                "height": {
                                    "type": "object",
                                    "description": "Height of the user",
                                    "properties": {
                                        "value": { "type": "number", "description": "Height value (e.g., fit)" },
                                        "unit": { "type": "string", "description": "Unit of height (e.g., inches)" }
                                    },
                                    "example": { "fit": 5, "inc": 6 }
                                },
                                "language": { "type": "string", "description": "Preferred language of the user" },
                                "ethnicity": { "type": "string", "description": "Ethnicity of the user" },
                                "country": { "type": "string", "description": "Country of the user" },
                                "profile": { "type": "string", "format": "binary", "description": "Profile picture of the user" }
                            },
                            "required": []
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User profile updated successfully.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean", "example": true },
                                    "message": { "type": "string", "example": "Users Profile Updated Successfully" }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad request, missing or invalid input.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean", "example": false },
                                    "message": { "type": "string", "example": "Users Token Is Required" }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "User profile not found.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean", "example": false },
                                    "message": { "type": "string", "example": "Users Profile Not Found" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal server error.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": { "type": "string", "example": "update_profile error stacktrace" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/add-terra-connection": {
        post: {
            summary: "Add Terra Connection",
            description: "Create or update a Terra connection for the user.",
            tags: ["User"],
            requestBody: {
                required: true,
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                provider: { type: "string", example: "fitbit" },
                                terra_user_id: { type: "string", example: "terraUser123" },
                            },
                            required: ["provider", "terra_user_id"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Terra connection added successfully." },
                400: { description: "Validation error." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/terra-connection-list": {
        get: {
            summary: "Get Terra Connections",
            description: "Retrieve the Terra connections for the logged-in user.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            // parameters: [
            //     {
            //         in: "header",
            //         name: "Authorization",
            //         required: true,
            //         schema: { type: "string" },
            //         description: "JWT token for authorization.",
            //     },
            // ],
            responses: {
                200: { description: "Terra connections retrieved successfully." },
                404: { description: "No Terra connections found." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/generate-widget-session": {
        get: {
            summary: "Generate Widget Session",
            description: "Generate a Terra widget session for the specified provider.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: "query",
                    name: "provider",
                    required: true,
                    schema: { type: "string" },
                    description: "Name of the provider for the widget session.",
                },
            ],
            responses: {
                200: { description: "Widget session generated successfully." },
                400: { description: "Provider is required." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/terra-auth-token": {
        get: {
            summary: "Get Terra Auth Token",
            description: "Retrieve an authentication token from Terra.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            responses: {
                200: { description: "Auth token retrieved successfully." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/user-daily-data": {
        get: {
            summary: "Get User Daily Data",
            description: "Retrieve daily health data for the specified Terra user ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: "query",
                    name: "terra_user_id",
                    required: true,
                    schema: { type: "string" },
                    description: "Terra user ID.",
                },
            ],
            responses: {
                200: { description: "Daily data retrieved successfully." },
                400: { description: "Terra user ID is required." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/user-body-data": {
        get: {
            summary: "Get User Body Data",
            description: "Retrieve body health data for the specified Terra user ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: "query",
                    name: "terra_user_id",
                    required: true,
                    schema: { type: "string" },
                    description: "Terra user ID.",
                },
            ],
            responses: {
                200: { description: "Body data retrieved successfully." },
                400: { description: "Terra user ID is required." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/user-sleep-data": {
        get: {
            summary: "Get User Sleep Data",
            description: "Retrieve sleep health data for the specified Terra user ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: "query",
                    name: "terra_user_id",
                    required: true,
                    schema: { type: "string" },
                    description: "Terra user ID.",
                },
            ],
            responses: {
                200: { description: "Sleep data retrieved successfully." },
                400: { description: "Terra user ID is required." },
                500: { description: "Internal server error." },
            },
        },
    },

    "/api/user/workout-overview-data": {
        "post": {
            "summary": "Retrieve workout overview data",
            "description": "Fetch strain, recovery, and sleep score counts based on filters like Week, Month, etc.",
            "tags": ["User"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "terra_user_id": {
                                    "type": "string",
                                    "description": "User ID from Terra",
                                    "example": "123456"
                                },
                                "filter_key": {
                                    "type": "string",
                                    "description": "Filter type (Week, Month, Six, Year, Date)",
                                    "example": "Week, Month, Six, Year, Date"
                                },
                                "date": {
                                    "type": "string",
                                    "description": "Specific date (if filter_key is Date)",
                                    "example": "2024-01-01"
                                }
                            },
                            "required": ["terra_user_id"]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User Data Retrieved Successfully",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" },
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "strain_level_count": { "type": "integer" },
                                            "recovery_level_count": { "type": "integer" },
                                            "sleep_score_count": { "type": "integer" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/activity-cycling-data": {
        "get": {
            "summary": "Retrieve activity cycling data",
            "description": "Fetch menstruation data for a specific user.",
            "tags": ["User"],
            "parameters": [
                {
                    "name": "terra_user_id",
                    "in": "query",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "User ID from Terra"
                }
            ],
            "responses": {
                "200": {
                    "description": "Activity Cycling Data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" },
                                    "data": {
                                        "type": "array",
                                        "items": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/activity-swimming-data": {
        "get": {
            "summary": "Retrieve activity swimming data",
            "description": "Fetch swimming activity data for a specific user.",
            "tags": ["User"],
            "parameters": [
                {
                    "name": "terra_user_id",
                    "in": "query",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "User ID from Terra"
                }
            ],
            "responses": {
                "200": {
                    "description": "Activity Swimming Data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" },
                                    "data": {
                                        "type": "array",
                                        "items": { "type": "object" }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/activity-sleep-data": {
        "get": {
            "summary": "Retrieve activity sleep data",
            "description": "Fetch sleep data including sleep score, duration, and time range.",
            "tags": ["User"],
            "parameters": [
                {
                    "name": "terra_user_id",
                    "in": "query",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "User ID from Terra"
                }
            ],
            "responses": {
                "200": {
                    "description": "Activity Sleep Data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" },
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "sleep_score": { "type": "integer" },
                                            "final_sleep_hr": { "type": "string" },
                                            "startTime": { "type": "string" },
                                            "endTime": { "type": "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean" },
                                    "message": { "type": "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/resting-heart-rate": {
        "post": {
            "summary": "Get Resting Heart Rate Data",
            "description": "Fetch average resting heart rate, maximum heart rate, heart rate variability (HRV), or VO2 max data for a specified user and time range.",
            "tags": ["User"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "terra_user_id": {
                                    "type": "string",
                                    "description": "Unique ID of the Terra user.",
                                    "example": "f11d9e23-5961-4e43-9f25-f15ddc9483e8"
                                },
                                "manu_key": {
                                    "type": "string",
                                    "description": "Key to filter the metric to calculate. Allowed values: 'MHR', 'HRV', 'VO2', 'Cardio'.",
                                    "example": "RHV, MHR, HRV, VO2, Cardio"
                                },
                                "filter_key": {
                                    "type": "string",
                                    "description": "Filter for time range. Allowed values: 'Week', 'Month', 'Six', 'Year', 'Date'.",
                                    "example": "Week, Month, Six, Year, Date"
                                },
                                "date": {
                                    "type": "string",
                                    "format": "date",
                                    "description": "Specific date for 'Date' filter in YYYY-MM-DD format. Required when filter_key is 'Date'.",
                                    "example": "2024-12-01"
                                }
                            },
                            "required": ["terra_user_id", "manu_key"]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Resting Heart Rate Data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "boolean",
                                        "example": true
                                    },
                                    "message": {
                                        "type": "string",
                                        "example": "Resting Heart Rate Data"
                                    },
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "average": {
                                                "type": "number",
                                                "description": "Calculated average value of the specified metric.",
                                                "example": 72
                                            },
                                            "start_date": {
                                                "type": "string",
                                                "format": "date-time",
                                                "description": "Start date of the filter range.",
                                                "example": "2024-12-09T07:27:13.739000+00:00"
                                            },
                                            "end_date": {
                                                "type": "string",
                                                "format": "date-time",
                                                "description": "End date of the filter range.",
                                                "example": "2025-01-09T07:27:13.738000+00:00"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "boolean",
                                        "example": false
                                    },
                                    "message": {
                                        "type": "string",
                                        "example": "Terra User Id Is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "boolean",
                                        "example": false
                                    },
                                    "message": {
                                        "type": "string",
                                        "example": "Internal Server Error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/plan-list": {
        get: {
            summary: "Retrieve a list of subscription plans",
            description: "Fetches all available subscription plans sorted by amount in ascending order.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            responses: {
                200: {
                    description: "Successfully retrieved the subscription plans."
                },
                500: {
                    description: "Internal server error."
                },
            },
        },
    },

    "/api/user/create-event": {
        post: {
            summary: "Create a new event",
            description: "Allows the user to create a new event with details such as name, description, date, location, and optional image upload.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                event_name: {
                                    type: "string",
                                    example: "Yoga Marathon"
                                },
                                event_description: {
                                    type: "string",
                                    example: "Join us for a peaceful yoga session."
                                },
                                approximate_duration: {
                                    type: "string",
                                    example: "{\"hours\":2,\"minutes\":30}"
                                },
                                event_date: {
                                    type: "string",
                                    format: "date",
                                    example: "2025-05-20"
                                },
                                event_location: {
                                    type: "string",
                                    example: "{\"lat\":22.7196,\"lng\":75.8577,\"address\":\"Indore Park\"}"
                                },
                                registration_closing_date: {
                                    type: "string",
                                    format: "date",
                                    example: "2025-05-18"
                                },
                                additional_information: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    },
                                    example: ["Bring your mat", "Wear sports clothes"]
                                },
                                event_img: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Event created successfully"
                },
                400: {
                    description: "Validation failed or event already exists"
                },
                500: {
                    description: "Internal server error"
                }
            }
        }
    },

    "/api/user/events-list": {
        get: {
            summary: "Get filtered list of events",
            description: "Returns a list of events filtered by status (My_event or Favourited), date range, and user-specific participation.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "status_key",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["My_event", "Favourited", "Upcoming"]
                    },
                    description: "Status filter: My_event or Favourited"
                },
                {
                    name: "filter_key",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["Day", "Week", "Month", "Six", "Year", "Date"]
                    },
                    description: "Optional key used for dynamic filtering"
                },
                {
                    name: "statrt_date",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        format: "date"
                    },
                    description: "Start date in ISO format"
                },
                {
                    name: "end_date",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        format: "date"
                    },
                    description: "End date in ISO format"
                }
            ],
            responses: {
                200: {
                    description: "Event list fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event List"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            description: "Event object"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid query parameters or missing user ID"
                },
                500: {
                    description: "Internal server error"
                }
            }
        }
    },

    "/api/user/event-view": {
        get: {
            summary: "View single event details",
            description: "Fetches the details of a specific event using its ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "event_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "The ID of the event to be fetched"
                }
            ],
            responses: {
                200: {
                    description: "Event details fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event List"
                                    },
                                    data: {
                                        type: "object",
                                        description: "Event details object"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or invalid event_id",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "object"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/event-edit": {
        patch: {
            summary: "Edit an existing event",
            description: "Allows the user to update event details such as name, description, date, location, and image.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "event_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "The ID of the event to be edited"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                event_name: {
                                    type: "string",
                                    example: "Yoga Marathon"
                                },
                                event_description: {
                                    type: "string",
                                    example: "Join us for a peaceful yoga session."
                                },
                                approximate_duration: {
                                    type: "string",
                                    example: "{\"hours\":2,\"minutes\":30}"
                                },
                                event_date: {
                                    type: "string",
                                    format: "date",
                                    example: "2025-05-20"
                                },
                                event_location: {
                                    type: "string",
                                    example: "{\"lat\":22.7196,\"lng\":75.8577,\"address\":\"Indore Park\"}"
                                },
                                registration_closing_date: {
                                    type: "string",
                                    format: "date",
                                    example: "2025-05-18"
                                },
                                additional_information: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    },
                                    example: ["Bring your mat", "Wear sports clothes"]
                                },
                                event_img: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Event updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Event Updated Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error or missing event_id",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Event Id is Required" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "object" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/event-delete": {
        delete: {
            summary: "Delete an event",
            description: "Deletes a specific event based on the provided event ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "event_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "The ID of the event to be deleted"
                }
            ],
            responses: {
                200: {
                    description: "Event deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Event Deleted Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Event ID is missing",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Event Id is Required" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "object" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/add-event-favourited": {
        get: {
            summary: "Add or remove an event from favourites",
            description: "Toggle favourite status for a given event by the logged-in user. If already favourited, it removes it; otherwise, it adds.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "event_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: ""
                    },
                    description: "ID of the event to add or remove from favourites"
                }
            ],
            responses: {
                200: {
                    description: "Favourite status toggled successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Added to Favourites"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or invalid event ID",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Event not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Not Found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/join-event": {
        get: {
            summary: "Join an event",
            description: "Allows a logged-in user to join a specific event. If the event is already joined, it returns an error.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "event_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: ""
                    },
                    description: "ID of the event the user wants to join"
                }
            ],
            responses: {
                200: {
                    description: "Successfully joined the event",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Successfully Joined Event"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "User already joined the event",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Already Joined"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Event not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Not Found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/leave-event": {
        get: {
            summary: "Leave an event",
            description: "Allows a logged-in user to leave an event they have previously joined. Returns error if the user has not joined the event.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "event_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: ""
                    },
                    description: "ID of the event the user wants to leave"
                }
            ],
            responses: {
                200: {
                    description: "Successfully left the event",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Successfully Left the Event"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "User has not joined the event",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "You have Not Joined this Event"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Event not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Event Not Found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/suggestions-list": {
        get: {
            summary: "Get friend suggestions",
            description: "Returns a list of suggested users to send friend requests to, excluding existing friends, blocked users, and those who have sent/received a request already.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Successfully retrieved friend suggestions",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Suggestion User List."
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "660a1f8efb134b6c5b47306f"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "John Doe"
                                                },
                                                nick_name: {
                                                    type: "string",
                                                    example: "johhny"
                                                },
                                                email: {
                                                    type: "string",
                                                    example: "john@example.com"
                                                },
                                                profile: {
                                                    type: "string",
                                                    example: "profile.jpg"
                                                },
                                                mutual_friends_count: {
                                                    type: "integer",
                                                    example: 3
                                                },
                                                request_status: {
                                                    type: "boolean",
                                                    example: false
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/sned-friend-request": {
        get: {
            summary: "Send a friend request",
            description: "Send a friend request from the logged-in user to another user. Cannot send request to self or if already sent.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "receiver_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "6645a3d894d4b5e61d85b2c3"
                    },
                    description: "User ID of the receiver"
                }
            ],
            responses: {
                200: {
                    description: "Friend request sent successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Friend Request Sent"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid input or request already sent",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Request Already Sent"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/friend-request-list": {
        get: {
            summary: "Get list of incoming friend requests",
            description: "Fetches the list of users who have sent friend requests to the logged-in user, along with their basic details and mutual friends count.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Successfully retrieved friend request list",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Friend Request List."
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                sender: {
                                                    type: "string",
                                                    example: "6645a3d894d4b5e61d85b2c3"
                                                },
                                                receiver: {
                                                    type: "string",
                                                    example: "6645a3d894d4b5e61d85b2c1"
                                                },
                                                status: {
                                                    type: "string",
                                                    example: "pending"
                                                },
                                                createdAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    example: "2024-05-21T10:23:45.000Z"
                                                },
                                                user_detials: {
                                                    type: "object",
                                                    properties: {
                                                        name: {
                                                            type: "string",
                                                            example: "John Doe"
                                                        },
                                                        email: {
                                                            type: "string",
                                                            example: "john@example.com"
                                                        },
                                                        profile: {
                                                            type: "string",
                                                            example: "https://example.com/profile.jpg"
                                                        }
                                                    }
                                                },
                                                mutual_friends_count: {
                                                    type: "integer",
                                                    example: 3
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/accept-or-decline-request": {
        get: {
            summary: "Accept or Decline Friend Request",
            description: "Accepts or declines a friend request based on the request ID and status provided in the query parameters. If accepted, both users are added to each other's friend lists. If declined, the request is deleted.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "status",
                    in: "query",
                    required: true,
                    description: "The action to take: 'accepted' or 'declined'",
                    schema: {
                        type: "string",
                        enum: ["accepted", "declined"],
                        example: "accepted"
                    }
                },
                {
                    name: "request_id",
                    in: "query",
                    required: true,
                    description: "The ID of the friend request to act upon",
                    schema: {
                        type: "string",
                        example: "6645a3d894d4b5e61d85b2c3"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Successfully processed the request",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Request accepted Successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Missing or invalid parameters",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Status and Request Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/connection-list": {
        get: {
            summary: "Get User's Connections with Mutual Friend Count",
            description: "Returns the list of connected users (friends) for the authenticated user, along with the count of mutual friends with each connection.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "List of connected users with mutual friend count",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Connected User List"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "6645a3d894d4b5e61d85b2c3"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "Ritik Kumar"
                                                },
                                                nick_name: {
                                                    type: "string",
                                                    example: "Ritz"
                                                },
                                                email: {
                                                    type: "string",
                                                    example: "ritik@example.com"
                                                },
                                                profile: {
                                                    type: "string",
                                                    example: "https://example.com/images/profile.jpg"
                                                },
                                                mutual_friends_count: {
                                                    type: "integer",
                                                    example: 4
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/connection-view": {
        get: {
            summary: "View Connection Status with Another User",
            description: "Returns the connection status between the logged-in user and another user, along with basic profile info and mutual friends.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "user_id",
                    in: "query",
                    required: true,
                    description: "The ID of the user to view connection with",
                    schema: {
                        type: "string",
                        example: "6645a3d894d4b5e61d85b2c3"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Connection status and user details retrieved",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Connection status fetched successfully"
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            connectionStatus: {
                                                type: "string",
                                                example: "Connected"
                                            },
                                            showMessageButton: {
                                                type: "boolean",
                                                example: true
                                            },
                                            showConnectButton: {
                                                type: "boolean",
                                                example: false
                                            },
                                            user_data: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string",
                                                        example: "6645a3d894d4b5e61d85b2c3"
                                                    },
                                                    name: {
                                                        type: "string",
                                                        example: "Ritik Patidar"
                                                    },
                                                    nick_name: {
                                                        type: "string",
                                                        example: "Ritz"
                                                    },
                                                    country: {
                                                        type: "string",
                                                        example: "India"
                                                    },
                                                    profile: {
                                                        type: "string",
                                                        example: "https://example.com/profile.jpg"
                                                    },
                                                    mutualFriendsCount: {
                                                        type: "integer",
                                                        example: 3
                                                    },
                                                    mutualFriends: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                _id: {
                                                                    type: "string",
                                                                    example: "6645a3d894d4b5e61d85b222"
                                                                },
                                                                name: {
                                                                    type: "string",
                                                                    example: "Aman Singh"
                                                                },
                                                                profile: {
                                                                    type: "string",
                                                                    example: "https://example.com/images/aman.jpg"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Missing or invalid user ID",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "User Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "User not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "User not found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Something went wrong"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error details"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/unfriend-request": {
        get: {
            summary: "Unfriend a User",
            description: "Removes the specified user from the logged-in user's friend list and vice versa.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "friend_id",
                    in: "query",
                    required: true,
                    description: "The ID of the friend to unfriend",
                    schema: {
                        type: "string",
                        example: "6645a3d894d4b5e61d85b2c3"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Successfully unfriended",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Connection Unfriend Successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Missing friend ID",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Request Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/block-request": {
        get: {
            summary: "Block or Unblock a User",
            description: "Block a user by removing them from the friend list and adding them to the block list, or unblock them by removing from block list and re-adding to the friend list.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "friend_id",
                    in: "query",
                    required: true,
                    description: "The ID of the friend to block or unblock",
                    schema: {
                        type: "string",
                        example: "6645a3d894d4b5e61d85b2c3"
                    }
                },
                {
                    name: "status",
                    in: "query",
                    required: true,
                    description: "Block or Unblock status",
                    schema: {
                        type: "string",
                        enum: ["Block", "Unblock"],
                        example: "Block"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Successfully blocked or unblocked the user",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Connection Block Successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Missing or Invalid Parameters",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Select a Valid Status"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/block-user": {
        get: {
            summary: "Get Blocked Users",
            description: "Fetch the list of users blocked by the currently logged-in user.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Blocked user list fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Connected User List"
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            block: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        _id: { type: "string", example: "6645a3d894d4b5e61d85b2c3" },
                                                        name: { type: "string", example: "John Doe" },
                                                        nick_name: { type: "string", example: "Johnny" },
                                                        email: { type: "string", example: "john@example.com" },
                                                        profile: { type: "string", example: "https://example.com/profile.jpg" }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/search-connection": {
        get: {
            summary: "Search Connections",
            description: "Search user's friends/connections by name, nickname, or email.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "search",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "Search keyword (name, nickname, or email)"
                }
            ],
            responses: {
                200: {
                    description: "Connections search result",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Connections search result."
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: {
                                                    type: "string",
                                                    example: "John Doe"
                                                },
                                                nick_name: {
                                                    type: "string",
                                                    example: "Johnny"
                                                },
                                                email: {
                                                    type: "string",
                                                    example: "john@example.com"
                                                },
                                                profile: {
                                                    type: "string",
                                                    example: "https://example.com/profile.jpg"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Search keyword is missing",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Search keyword is required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/create-group": {
        post: {
            summary: "Create Group",
            description: "Creates a new group with a unique name and optional image.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    example: "Friends Group"
                                },
                                image: {
                                    type: "string",
                                    format: "binary"
                                }
                            },
                            required: ["name"]
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Group Created Successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Group Created Successfull"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Group Already Exists or Missing Name",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Group Already Exist"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/group-list": {
        get: {
            summary: "Get Group List",
            description: "Fetch the list of groups created by the currently logged-in user.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Group List fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Group List"
                                    },
                                    group_list: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: { type: "string", example: "6645a3d894d4b5e61d85b2c3" },
                                                name: { type: "string", example: "Friends Group" },
                                                admin: { type: "string", example: "663e3b8c0b24b3e6dfb34567" },
                                                image: { type: "string", example: "https://example.com/group.jpg" },
                                                members: {
                                                    type: "array",
                                                    items: { type: "string", example: "663e3b8c0b24b3e6dfb34567" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/invites-user": {
        get: {
            summary: "Invite User to Group",
            description: "Invites a friend to join a specific group. The user must not already be a member or already invited.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "group_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "682ef58b9a7e68b000e60d21"
                    },
                    description: "The ID of the group to which the friend will be invited."
                },
                {
                    name: "friend_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "68235633216d67de02b7f862"
                    },
                    description: "The ID of the friend to be invited."
                }
            ],
            responses: {
                200: {
                    description: "Invitation sent successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Invitation sent!"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "User already in group or already invited",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "User is already invited!"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Group not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Group Not Found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/invites-request": {
        get: {
            summary: "Get Group Invitations",
            description: "Fetches a list of groups where the current user has been invited.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Invitation list fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Invitation list"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "665b1e8b5efdf49f56e0b2a1"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "Friends Group"
                                                },
                                                image: {
                                                    type: "string",
                                                    example: "https://example.com/group.jpg"
                                                },
                                                admin: {
                                                    type: "object",
                                                    properties: {
                                                        name: { type: "string", example: "Ritik Patidar" },
                                                        email: { type: "string", example: "ritik@example.com" }
                                                    }
                                                },
                                                members: {
                                                    type: "array",
                                                    items: { type: "string" }
                                                },
                                                invites: {
                                                    type: "array",
                                                    items: { type: "string" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/joined-groups": {
        get: {
            summary: "Get Joined Groups",
            description: "Fetches a list of groups the current user has joined.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Joined group list fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Invitation list"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "665b1e8b5efdf49f56e0b2a1"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "React Developers"
                                                },
                                                image: {
                                                    type: "string",
                                                    example: "https://example.com/group-image.jpg"
                                                },
                                                admin: {
                                                    type: "object",
                                                    properties: {
                                                        name: { type: "string", example: "Ritik Patidar" },
                                                        email: { type: "string", example: "ritik@example.com" }
                                                    }
                                                },
                                                members: {
                                                    type: "array",
                                                    items: { type: "string" }
                                                },
                                                invites: {
                                                    type: "array",
                                                    items: { type: "string" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/accept-or-decline-group-request": {
        get: {
            summary: "Accept or Decline Group Invitation",
            description: "Allows a user to accept or decline a group invitation based on request ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "status",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        enum: ["accepted", "declined"]
                    },
                    description: "Status of the request – either 'accepted' or 'declined'."
                },
                {
                    name: "request_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "665b1e8b5efdf49f56e0b2a1"
                    },
                    description: "The ID of the group request to act upon."
                }
            ],
            responses: {
                200: {
                    description: "Request handled successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Request accepted Successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request (Invalid input or missing parameters)",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Status and Request Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/leave-group": {
        get: {
            summary: "Leave Group",
            description: "Allows the authenticated user to leave a group by providing the group ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "group_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "665b1e8b5efdf49f56e0b2a1"
                    },
                    description: "The ID of the group to leave."
                }
            ],
            responses: {
                200: {
                    description: "Group left successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "You Have Successfully Leaved Group"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or Invalid Group ID",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Group Id is Required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/challenges-type-list": {
        get: {
            summary: "Challenges Type List",
            description: "Fetches the list of all available challenge types sorted by name.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Challenges Type List Retrieved Successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Challenges Type List"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "665b211ec112ccc93d60c034"
                                                },
                                                challenge_name: {
                                                    type: "string",
                                                    example: "Fitness"
                                                },
                                                // Add more properties as per your schema
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "No Challenge Types Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Challenges Type Not Found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/create-challenge": {
        post: {
            summary: "Create Challenge",
            description: "Creates a new challenge with details such as challenge type, date range, privacy, and invites.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                challenge_type: {
                                    type: "string",
                                    example: "fitness"
                                },
                                challenge_type_object: {
                                    type: "string",
                                    description: "Stringified JSON object",
                                    example: "{\"type_id\": \"123\", \"type_name\": \"Fitness\"}"
                                },
                                challenge_name: {
                                    type: "string",
                                    example: "30 Day Fitness Challenge"
                                },
                                message_to_challengers: {
                                    type: "string",
                                    example: "Let's get fit together!"
                                },
                                active_zones: {
                                    type: "string",
                                    example: "India, USA"
                                },
                                challenge_date_range: {
                                    type: "string",
                                    description: "Stringified JSON object",
                                    example: "{\"start_date\": \"2025-06-01\", \"end_date\": \"2025-06-30\"}"
                                },
                                make_challenge_private: {
                                    type: "string",
                                    example: "yes"
                                },
                                invites: {
                                    type: "string",
                                    description: "Stringified array of user IDs",
                                    example: "[\"67ac93a54a314d057895283e\", \"67b58b9f959a2c38c48180e7\"]"
                                },
                                image: {
                                    type: "string",
                                    format: "binary"
                                }
                            },
                            required: ["challenge_type", "challenge_type_object", "challenge_name", "challenge_date_range", "make_challenge_private"]
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Challenge Created Successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Chalenge Created Successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request / Validation Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Challenge Name Is A Required Field"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/challenges-list": {
        get: {
            summary: "Get Challenge List",
            description: "Fetches a list of challenges based on status query parameter (my_challenges, past_challenges, invites, or all active challenges).",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "status",
                    in: "query",
                    description: "Filter challenges by status: my_challenges, past_challenges, invites, or leave empty for active challenges",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["my_challenges", "past_challenges", "invites"]
                    }
                }
            ],
            responses: {
                200: {
                    description: "Challenges List fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Challenges List" },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: { type: "string", example: "607f1f77bcf86cd799439011" },
                                                challenge_type: { type: "string", example: "fitness" },
                                                challenge_name: { type: "string", example: "30 Day Fitness Challenge" },
                                                challenge_date_range: {
                                                    type: "object",
                                                    properties: {
                                                        start_date: { type: "string", format: "date", example: "2025-06-01" },
                                                        end_date: { type: "string", format: "date", example: "2025-06-30" }
                                                    }
                                                },
                                                participants: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            name: { type: "string", example: "John Doe" },
                                                            profile: { type: "string", example: "profile_pic_url" }
                                                        }
                                                    }
                                                },
                                                invites: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            name: { type: "string", example: "Jane Smith" },
                                                            profile: { type: "string", example: "profile_pic_url" }
                                                        }
                                                    }
                                                }
                                                // add other relevant properties as needed
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/challenges-view": {
        get: {
            summary: "View Challenge",
            description: "Fetches details of a challenge by challenge_id",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "challenge_id",
                    in: "query",
                    description: "ID of the challenge to view",
                    required: true,
                    schema: {
                        type: "string",
                        example: "607f1f77bcf86cd799439011"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Challenge details fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Challenges view" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string", example: "607f1f77bcf86cd799439011" },
                                            challenge_type: { type: "string", example: "fitness" },
                                            challenge_name: { type: "string", example: "30 Day Fitness Challenge" },
                                            challenge_date_range: {
                                                type: "object",
                                                properties: {
                                                    start_date: { type: "string", format: "date", example: "2025-06-01" },
                                                    end_date: { type: "string", format: "date", example: "2025-06-30" }
                                                }
                                            }
                                            // add other relevant challenge properties as needed
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Challenge Id is required",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Id is required" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Challenge Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Not Found" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/challenges-edit": {
        patch: {
            summary: "Edit Challenge",
            description: "Updates an existing challenge by challenge_id",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "challenge_id",
                    in: "query",
                    description: "ID of the challenge to update",
                    required: true,
                    schema: {
                        type: "string",
                        example: "607f1f77bcf86cd799439011"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                challenge_type: { type: "string", example: "fitness" },
                                challenge_type_object: {
                                    type: "string",
                                    description: "Stringified JSON object",
                                    example: "{\"type_id\": \"123\", \"type_name\": \"Fitness\"}"
                                },
                                challenge_name: { type: "string", example: "30 Day Fitness Challenge" },
                                message_to_challengers: { type: "string", example: "Let's get fit together!" },
                                active_zones: { type: "string", example: "India, USA" },
                                challenge_date_range: {
                                    type: "string",
                                    description: "Stringified JSON object",
                                    example: "{\"start_date\": \"2025-06-01\", \"end_date\": \"2025-06-30\"}"
                                },
                                make_challenge_private: { type: "string", example: "yes" },
                                invites: {
                                    type: "string",
                                    description: "Stringified array of user IDs",
                                    example: "[\"67ac93a54a314d057895283e\", \"67b58b9f959a2c38c48180e7\"]"
                                },
                                image: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Challenge Updated Successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Chalenge Updated Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Challenge Id is required",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Id is required" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/delete-challenges": {
        delete: {
            summary: "Delete Challenge",
            description: "Deletes a challenge by its ID",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "challenge_id",
                    in: "query",
                    description: "ID of the challenge to delete",
                    required: true,
                    schema: {
                        type: "string",
                        example: "607f1f77bcf86cd799439011"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Challenge Deleted Successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Challenges Deleted Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request-Challenge Id is required",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Id is required" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/challenges-list-for-join": {
        get: {
            summary: "Get Challenges List For Join",
            description: "Returns a list of challenges that a user can join based on filters like status, date, or favourites.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "status",
                    in: "query",
                    description: "Filter challenges based on status (e.g., active, favourited)",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["active", "favourited"],
                        example: "active"
                    }
                },
                {
                    name: "filter_key",
                    in: "query",
                    description: "Optional filter key used for custom filtering",
                    required: false,
                    schema: {
                        type: "string",
                        example: "challenge_type_object.type"
                    }
                },
                {
                    name: "statrt_date",
                    in: "query",
                    description: "Filter challenges starting from this date (UTC)",
                    required: false,
                    schema: {
                        type: "string",
                        format: "date-time",
                        example: "2025-05-01T00:00:00.000Z"
                    }
                },
                {
                    name: "end_date",
                    in: "query",
                    description: "Filter challenges ending before this date (UTC)",
                    required: false,
                    schema: {
                        type: "string",
                        format: "date-time",
                        example: "2025-05-31T23:59:59.999Z"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Challenges List Retrieved Successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Challenges List" },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            description: "Challenge Object"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/add-challenges-favourited": {
        get: {
            summary: "Add or Remove Challenge from Favourites",
            description: "Toggles a challenge as favourited or unfavourited by the logged-in user.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "challenge_id",
                    in: "query",
                    description: "ID of the challenge to add or remove from favourites",
                    required: true,
                    schema: {
                        type: "string",
                        example: "607f1f77bcf86cd799439011"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Favourite status toggled",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: {
                                        type: "string",
                                        example: "Event Added to Favourites"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Event Id is Required",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Event Id is Required" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Event Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Event Not Found" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/join-challenges": {
        get: {
            summary: "Join Challenge",
            description: "Allows a user to join a specific challenge by its ID. Removes the user from invites list if present.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "challenge_id",
                    in: "query",
                    description: "ID of the challenge to join",
                    required: true,
                    schema: {
                        type: "string",
                        example: "607f1f77bcf86cd799439011"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Successfully joined the challenge",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Successfully Joined Challenge" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - Already Joined",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Already Joined" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Challenge Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Not Found" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/leave-challenges": {
        get: {
            summary: "Leave Challenge",
            description: "Allows a user to leave a joined challenge by its ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "challenge_id",
                    in: "query",
                    description: "ID of the challenge to leave",
                    required: true,
                    schema: {
                        type: "string",
                        example: "607f1f77bcf86cd799439011"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Successfully left the challenge",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Successfully Left the Challenge" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad Request - User has not joined the challenge",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "You have Not Joined this Challenge" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Challenge Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Challenge Not Found" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/add-journal": {
        post: {
            summary: "Add Daily Journal",
            description: "Allows a user to add a daily journal entry. Only one entry is allowed per day.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                date: {
                                    type: "string",
                                    example: "2025-05-22"
                                },
                                feeling: {
                                    type: "number",
                                    example: 8
                                }
                            },
                            required: ["date", "feeling"]
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Journal entry created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Today Journal Added Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Validation Error or Journal Already Exists",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Today Journal Already Exist" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/journal-list": {
        get: {
            summary: "Get Journal Entries",
            description: "Retrieves a list of journal entries for a user based on filter criteria like Week, Month, Six Months, Year, or a specific Date range.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "filter_key",
                    in: "query",
                    description: "Filter type: 'Week', 'Month', 'Six', 'Year', or 'Date'",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["Week", "Month", "Six", "Year", "Date"]
                    }
                },
                {
                    name: "start_date",
                    in: "query",
                    description: "Start date for 'Date' filter (format: YYYY-MM-DD)",
                    required: false,
                    schema: {
                        type: "string",
                        format: "date",
                        example: "2025-05-01"
                    }
                },
                {
                    name: "end_date",
                    in: "query",
                    description: "End date for 'Date' filter (format: YYYY-MM-DD)",
                    required: false,
                    schema: {
                        type: "string",
                        format: "date",
                        example: "2025-05-22"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Successfully retrieved journal entries",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Journal List" },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: { type: "string", example: "60d21b4667d0d8992e610c85" },
                                                user_id: { type: "string", example: "60d21b0267d0d8992e610c84" },
                                                date: { type: "string", format: "date-time", example: "2025-05-22T10:00:00.000Z" },
                                                feeling: { type: "number", example: 7 },
                                                exercise: { type: "string", example: "Yoga" },
                                                alcohol: { type: "string", example: "No" },
                                                meditation: { type: "string", example: "10 minutes" },
                                                note: { type: "string", example: "Had a relaxed day." }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing required dates for 'Date' filter",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Start date and end date are required for Date filter" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/journal-edit": {
        patch: {
            summary: "Edit Journal Entry",
            description: "Updates a journal entry based on the provided journal ID and new data.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "journal_id",
                    in: "query",
                    description: "The ID of the journal entry to update",
                    required: true,
                    schema: {
                        type: "string",
                        example: "60d21b4667d0d8992e610c85"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                date: { type: "string", format: "date", example: "2025-05-22" },
                                feeling: { type: "number", example: 8 },
                                exercise: { type: "string", example: "Gym" },
                                alcohol: { type: "string", example: "No" },
                                meditation: { type: "string", example: "15 minutes" },
                                note: { type: "string", example: "Productive day, felt motivated." }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Journal updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Journal Updated Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or invalid journal ID",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Journal Id is Required" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Journal not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Journal Not Found" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/journal-delete": {
        delete: {
            summary: "Delete a Journal Entry",
            description: "Deletes a journal entry by its ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "journal_id",
                    in: "query",
                    description: "The ID of the journal entry to delete",
                    required: true,
                    schema: {
                        type: "string",
                        example: "60d21b4667d0d8992e610c85"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Journal deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: true },
                                    message: { type: "string", example: "Journal Deleted Successfully" }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or invalid journal ID",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Journal Id is Required" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Journal not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Journal Not Found" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: { type: "boolean", example: false },
                                    message: { type: "string", example: "Internal Server Error" },
                                    error: { type: "string", example: "Error stack trace or message" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/email-contactus": {
        post: {
            summary: "Send Contact Us Email",
            description: "Sends a contact inquiry email with inquiry type and description.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                inquiry_type: {
                                    type: "string",
                                    example: "Product Inquiry"
                                },
                                description: {
                                    type: "string",
                                    example: "I want to know more about your product features."
                                }
                            },
                            required: ["inquiry_type", "description"]
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Message sent successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Message sent successfully! We aim to respond within 48 hours"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Inquiry Type Cannot Be An Empty Field"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/email-contactus-list": {
        get: {
            summary: "Get Contact Us Email List",
            description: "Fetches the list of contact inquiry emails sent by the authenticated user.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: "Email Us List fetched successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Email Us List"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: { type: "string", example: "64b0f7a23f9b1a2e9c9b3f5c" },
                                                inquiry_type: { type: "string", example: "Product Inquiry" },
                                                description: { type: "string", example: "I want to know more about your product features." },
                                                user_id: { type: "string", example: "60d21b4667d0d8992e610c85" },
                                                createdAt: { type: "string", format: "date-time", example: "2025-05-22T10:30:00Z" },
                                                updatedAt: { type: "string", format: "date-time", example: "2025-05-23T11:30:00Z" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/delete-account": {
        delete: {
            summary: "Delete User Account",
            description: "Deletes the authenticated user's account. If `status=ExportAndDelete` is passed in query, exports user data as an Excel file before deletion.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "status",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        enum: ["ExportAndDelete"]
                    },
                    description: "Optional. If set to 'ExportAndDelete', user data is exported before deletion."
                }
            ],
            responses: {
                200: {
                    description: "Account deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Your Account is Deleted Successfully"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "User Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "User Not Found"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/get-card-details": {
        get: {
            summary: "Get Saved Card Details",
            description: "Retrieves saved card details for the given Stripe customer ID. Returns unique card brands only.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "customer_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "cus_RkQXOLYhh5fzsD"
                    },
                    description: "Stripe Customer ID"
                }
            ],
            responses: {
                200: {
                    description: "Card details retrieved successfully or no cards found",
                    content: {
                        "application/json": {
                            schema: {
                                oneOf: [
                                    {
                                        type: "object",
                                        properties: {
                                            status: {
                                                type: "boolean",
                                                example: true
                                            },
                                            message: {
                                                type: "string",
                                                example: "User's Saved Cards"
                                            },
                                            data: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        brand: {
                                                            type: "string",
                                                            example: "visa"
                                                        },
                                                        last4: {
                                                            type: "string",
                                                            example: "4242"
                                                        },
                                                        exp_month: {
                                                            type: "integer",
                                                            example: 12
                                                        },
                                                        exp_year: {
                                                            type: "integer",
                                                            example: 2025
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            status: {
                                                type: "boolean",
                                                example: false
                                            },
                                            message: {
                                                type: "string",
                                                example: "No saved card found"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                400: {
                    description: "Missing customer_id query parameter",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Customer ID is required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/get-transaction-history": {
        get: {
            summary: "Get Transaction History",
            description: "Fetches the transaction history (payment intents) for a specific Stripe customer.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "customer_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "cus_RkQXOLYhh5fzsD"
                    },
                    description: "Stripe Customer ID"
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        example: "10"
                    },
                    description: "Number of records to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Transaction history retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "User's Transaction List"
                                    },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    example: "pi_1Nsjh8KXvs0b0OaWyf2blUo9"
                                                },
                                                amount: {
                                                    type: "number",
                                                    example: 25.99
                                                },
                                                currency: {
                                                    type: "string",
                                                    example: "usd"
                                                },
                                                status: {
                                                    type: "string",
                                                    example: "succeeded"
                                                },
                                                created: {
                                                    type: "string",
                                                    example: "5/22/2025, 3:15:30 PM"
                                                },
                                                payment_method: {
                                                    type: "string",
                                                    example: "card"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing required query parameters",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Customer ID is required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/active-subscription": {
        get: {
            summary: "Active Subscription",
            description: "Fetches the active Stripe subscription plan for a customer.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "customer_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example:"cus_RkQXOLYhh5fzsD"
                    },
                    description: "Stripe Customer ID"
                }
            ],
            responses: {
                200: {
                    description: "Subscription status response",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "User's Active Plan"
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "sub_1NslrkKXvs0b0OaWYHvqp2Ij"
                                            },
                                            price: {
                                                type: "object",
                                                properties: {
                                                    id: {
                                                        type: "string",
                                                        example: "price_1NslrnKXvs0b0OaWZPbQpwLZ"
                                                    },
                                                    unit_amount: {
                                                        type: "integer",
                                                        example: 999
                                                    },
                                                    currency: {
                                                        type: "string",
                                                        example: "usd"
                                                    },
                                                    recurring: {
                                                        type: "object",
                                                        properties: {
                                                            interval: {
                                                                type: "string",
                                                                example: "month"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            quantity: {
                                                type: "integer",
                                                example: 1
                                            },
                                            subscription: {
                                                type: "string",
                                                example: "sub_1NslrkKXvs0b0OaWYHvqp2Ij"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or invalid request",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Customer ID is required"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/api/user/cancel-active-subscription": {
        get: {
            summary: "Cancel Active Subscription",
            description: "Cancels a user's active Stripe subscription using the subscription ID.",
            tags: ["User"],
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "subscription_id",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "The Stripe subscription ID to be canceled"
                }
            ],
            responses: {
                200: {
                    description: "Subscription successfully canceled",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Cancele User Subscription"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Missing or invalid subscription ID, or subscription already canceled",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Subscription is already canceled or not found."
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Internal Server Error"
                                    },
                                    error: {
                                        type: "string",
                                        example: "Error stack trace or message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    // Admin APIs
    "/api/admin/subscription-product-list": {
        get: {
            summary: "Get Subscription Products",
            description: "Fetches a list of active subscription products from Stripe.",
            tags: ["Stripe"],
            responses: {
                200: { description: "Successful response" },
                500: { description: "Internal Server Error" }
            }
        }
    },

    "/api/admin/add-subscription-plan": {
        post: {
            summary: "Add Subscription Plan",
            description: "Creates a new subscription plan.",
            tags: ["Stripe"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                plan_name: { type: "string" },
                                strip_price_id: { type: "string" },
                                plan_type: { type: "string" },
                                amount: { type: "string" }
                            },
                            required: ["plan_name", "strip_price_id", "plan_type", "amount"]
                        }
                    }
                }
            },
            responses: {
                201: { description: "Subscription plan added successfully" },
                400: { description: "Validation error" },
                500: { description: "Internal Server Error" }
            }
        }
    },

    "/api/admin/subscription-plan-list": {
        get: {
            summary: "Get Subscription Plans",
            description: "Retrieves a list of subscription plans.",
            tags: ["Stripe"],
            responses: {
                200: { description: "Successful response" },
                500: { description: "Internal Server Error" }
            }
        }
    },

    "/api/admin/subscription-plan-view": {
        "get": {
            "summary": "Get Subscription Plan Details",
            "description": "Retrieve details of a specific subscription plan by providing the plan ID.",
            "tags": ["Stripe"],
            "parameters": [
                {
                    "name": "plan_id",
                    "in": "query",
                    "required": true,
                    "description": "ID of the subscription plan to fetch",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Successful response with plan details",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean", "example": true },
                                    "message": { "type": "string", "example": "Plan View" },
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "_id": { "type": "string", "example": "67a9d8394941605d83bb18d4" },
                                            "plan_name": { "type": "string", "example": "Beginner" },
                                            "strip_price_id": { "type": "string", "example": "Free" },
                                            "plan_type": { "type": "string", "example": "Free" },
                                            "amount": { "type": "string", "example": "0" },
                                            "createdAt": { "type": "string", "format": "date-time", "example": "2025-02-10T10:43:05.493Z" },
                                            "updatedAt": { "type": "string", "format": "date-time", "example": "2025-02-10T10:43:05.493Z" },
                                            "__v": { "type": "integer", "example": 0 }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request - Missing or invalid plan ID",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean", "example": false },
                                    "message": { "type": "string", "example": "plan Id is Required." }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "boolean", "example": false },
                                    "message": { "type": "string", "example": "Internal Server Error" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },


    "/api/admin/create-customer": {
        get: {
            summary: "Create Stripe Customer",
            description: "Creates a Stripe customer if one does not already exist.",
            tags: ["Stripe"],
            parameters: [
                {
                    name: "user_id",
                    in: "query",
                    required: true,
                    schema: { type: "string" },
                    description: "User ID to associate with the customer"
                }
            ],
            responses: {
                200: { description: "Customer created successfully" },
                400: { description: "Invalid request" },
                500: { description: "Internal Server Error" }
            }
        }
    },

    "/api/admin/save-payment-method": {
        post: {
            summary: "Save Payment Method",
            description: "Saves and attaches a payment method to a customer.",
            tags: ["Stripe"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                customer_id: { type: "string" },
                                payment_method_id: { type: "string" }
                            },
                            required: ["customer_id", "payment_method_id"]
                        }
                    }
                }
            },
            responses: {
                200: { description: "Payment method saved successfully" },
                400: { description: "Validation error" },
                500: { description: "Internal Server Error" }
            }
        }
    },

    "/api/admin/create-subscription": {
        post: {
            summary: "Create Subscription",
            description: "Creates a new subscription for a customer.",
            tags: ["Stripe"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                customer_id: { type: "string" },
                                plan_id: { type: "string" }
                            },
                            required: ["customer_id", "plan_id"]
                        }
                    }
                }
            },
            responses: {
                200: { description: "Subscription created successfully" },
                400: { description: "Validation error" },
                500: { description: "Internal Server Error" }
            }
        }
    },

    "/api/admin/confirm-payment": {
        post: {
            summary: "Confirm Payment",
            description: "Confirms a payment for a subscription.",
            tags: ["Stripe"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                payment_intent_id: { type: "string" },
                                payment_method_id: { type: "string" }
                            },
                            required: ["payment_intent_id", "payment_method_id"]
                        }
                    }
                }
            },
            responses: {
                200: { description: "Payment successful" },
                400: { description: "Validation error" },
                500: { description: "Internal Server Error" }
            }
        }
    }

};

