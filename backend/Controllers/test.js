// {
//     "tests": {
//       "registerAdmin": [
//         {
//           "description": "Successfully register a new admin",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/register",
//             "body": {
//               "first_name": "John",
//               "last_name": "Doe",
//               "email": "john.doe@example.com",
//               "phone": "1234567890",
//               "gender": "male",
//               "password": "securePass123"
//             }
//           },
//           "expected": {
//             "status": 201,
//             "body": {
//               "message": "Admin registered successfully",
//               "admin": {
//                 "admin_id": { "type": "number" },
//                 "email": "john.doe@example.com",
//                 "role": "admin"
//               }
//             }
//           }
//         },
//         {
//           "description": "Fail to register admin with missing fields",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/register",
//             "body": {
//               "first_name": "John",
//               "last_name": "Doe",
//               "email": "john.doe@example.com"
//             }
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "All fields are required"
//             }
//           }
//         },
//         {
//           "description": "Fail to register admin with invalid email",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/register",
//             "body": {
//               "first_name": "John",
//               "last_name": "Doe",
//               "email": "invalid-email",
//               "phone": "1234567890",
//               "gender": "male",
//               "password": "securePass123"
//             }
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "Invalid email format"
//             }
//           }
//         },
//         {
//           "description": "Fail to register admin with duplicate email",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/register",
//             "body": {
//               "first_name": "Jane",
//               "last_name": "Smith",
//               "email": "john.doe@example.com",
//               "phone": "9876543210",
//               "gender": "female",
//               "password": "securePass456"
//             },
//             "precondition": "An admin with email 'john.doe@example.com' already exists"
//           },
//           "expected": {
//             "status": 409,
//             "body": {
//               "message": "Email already registered"
//             }
//           }
//         }
//       ],
//       "loginAdmin": [
//         {
//           "description": "Successfully login an admin",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/login",
//             "body": {
//               "email": "john.doe@example.com",
//               "password": "securePass123"
//             },
//             "precondition": "Admin with email 'john.doe@example.com' and password 'securePass123' exists"
//           },
//           "expected": {
//             "status": 200,
//             "body": {
//               "message": "Login successful",
//               "admin": {
//                 "admin_id": { "type": "number" },
//                 "email": "john.doe@example.com",
//                 "role": "admin"
//               }
//             }
//           }
//         },
//         {
//           "description": "Fail to login with incorrect password",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/login",
//             "body": {
//               "email": "john.doe@example.com",
//               "password": "wrongPass"
//             },
//             "precondition": "Admin with email 'john.doe@example.com' exists"
//           },
//           "expected": {
//             "status": 401,
//             "body": {
//               "message": "Invalid email or password"
//             }
//           }
//         },
//         {
//           "description": "Fail to login with non-existent email",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/login",
//             "body": {
//               "email": "nonexistent@example.com",
//               "password": "securePass123"
//             }
//           },
//           "expected": {
//             "status": 401,
//             "body": {
//               "message": "Invalid email or password"
//             }
//           }
//         },
//         {
//           "description": "Fail to login with missing email",
//           "input": {
//             "method": "POST",
//             "endpoint": "/admin/login",
//             "body": {
//               "password": "securePass123"
//             }
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "Email and password are required"
//             }
//           }
//         }
//       ],
//       "getAdminDetails": [
//         {
//           "description": "Successfully retrieve admin details by admin_id",
//           "input": {
//             "method": "GET",
//             "endpoint": "/admin/details",
//             "query": {
//               "admin_id": "123456"
//             },
//             "precondition": "Admin with admin_id '123456' exists"
//           },
//           "expected": {
//             "status": 200,
//             "body": {
//               "message": "Admin details retrieved successfully",
//               "admin": {
//                 "admin_id": 123456,
//                 "first_name": { "type": "string" },
//                 "last_name": { "type": "string" },
//                 "email": { "type": "string" },
//                 "phone": { "type": "string" },
//                 "gender": { "type": "string" },
//                 "role": "admin",
//                 "created_at": { "type": "string" }
//               }
//             }
//           }
//         },
//         {
//           "description": "Successfully retrieve admin details by email",
//           "input": {
//             "method": "GET",
//             "endpoint": "/admin/details",
//             "query": {
//               "email": "john.doe@example.com"
//             },
//             "precondition": "Admin with email 'john.doe@example.com' exists"
//           },
//           "expected": {
//             "status": 200,
//             "body": {
//               "message": "Admin details retrieved successfully",
//               "admin": {
//                 "admin_id": { "type": "number" },
//                 "first_name": { "type": "string" },
//                 "last_name": { "type": "string" },
//                 "email": "john.doe@example.com",
//                 "phone": { "type": "string" },
//                 "gender": { "type": "string" },
//                 "role": "admin",
//                 "created_at": { "type": "string" }
//               }
//             }
//           }
//         },
//         {
//           "description": "Fail to retrieve admin details with non-existent admin_id",
//           "input": {
//             "method": "GET",
//             "endpoint": "/admin/details",
//             "query": {
//               "admin_id": "999999"
//             }
//           },
//           "expected": {
//             "status": 404,
//             "body": {
//               "message": "Admin not found"
//             }
//           }
//         },
//         {
//           "description": "Fail to retrieve admin details with no parameters",
//           "input": {
//             "method": "GET",
//             "endpoint": "/admin/details",
//             "query": {}
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "Provide either admin_id or email"
//             }
//           }
//         }
//       ],
//       "updateAdmin": [
//         {
//           "description": "Successfully update admin details",
//           "input": {
//             "method": "PUT",
//             "endpoint": "/admin/update",
//             "body": {
//               "admin_id": "123456",
//               "first_name": "Johnny",
//               "email": "johnny.doe@example.com"
//             },
//             "precondition": "Admin with admin_id '123456' exists"
//           },
//           "expected": {
//             "status": 200,
//             "body": {
//               "message": "Admin updated successfully",
//               "admin": {
//                 "admin_id": 123456,
//                 "email": "johnny.doe@example.com",
//                 "role": "admin"
//               }
//             }
//           }
//         },
//         {
//           "description": "Fail to update admin with duplicate email",
//           "input": {
//             "method": "PUT",
//             "endpoint": "/admin/update",
//             "body": {
//               "admin_id": "123456",
//               "email": "jane.smith@example.com"
//             },
//             "precondition": "Another admin with email 'jane.smith@example.com' exists"
//           },
//           "expected": {
//             "status": 409,
//             "body": {
//               "message": "Email already in use"
//             }
//           }
//         },
//         {
//           "description": "Fail to update admin with invalid email",
//           "input": {
//             "method": "PUT",
//             "endpoint": "/admin/update",
//             "body": {
//               "admin_id": "123456",
//               "email": "invalid-email"
//             },
//             "precondition": "Admin with admin_id '123456' exists"
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "Invalid email format"
//             }
//           }
//         },
//         {
//           "description": "Fail to update admin with missing admin_id",
//           "input": {
//             "method": "PUT",
//             "endpoint": "/admin/update",
//             "body": {
//               "first_name": "Johnny"
//             }
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "admin_id is required"
//             }
//           }
//         }
//       ],
//       "deleteAdmin": [
//         {
//           "description": "Successfully delete an admin",
//           "input": {
//             "method": "DELETE",
//             "endpoint": "/admin/delete",
//             "body": {
//               "admin_id": "123456"
//             },
//             "precondition": "Admin with admin_id '123456' exists"
//           },
//           "expected": {
//             "status": 200,
//             "body": {
//               "message": "Admin deleted successfully"
//             }
//           }
//         },
//         {
//           "description": "Fail to delete admin with non-existent admin_id",
//           "input": {
//             "method": "DELETE",
//             "endpoint": "/admin/delete",
//             "body": {
//               "admin_id": "999999"
//             }
//           },
//           "expected": {
//             "status": 404,
//             "body": {
//               "message": "Admin not found"
//             }
//           }
//         },
//         {
//           "description": "Fail to delete admin with missing admin_id",
//           "input": {
//             "method": "DELETE",
//             "endpoint": "/admin/delete",
//             "body": {}
//           },
//           "expected": {
//             "status": 400,
//             "body": {
//               "message": "admin_id is required"
//             }
//           }
//         }
//       ]
//     }
//   }