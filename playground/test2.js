// // // {
// // //     "_id": "6136da86370744ab0c043767",
// // //     "serviceName": "service1",
// // //     "paths": [
// // //     {
// // //     "pathName": "user/v1/create",
// // //     "method": "post",
// // //     "operationId": "user",
// // //     "description": "description",
// // //     "parameters": [
// // //     {
// // //     "name": "test name",
// // //     "description": "test description",
// // //     "required": true,
// // //     "in": "query",
// // //     "type": "number",
// // //     "_id": "6136da86370744ab0c043769"
// // //     }
// // //     ],
// // //     "security": [
// // //     {
// // //     "token": [],
// // //     "_id": "6136da86370744ab0c04376a"
// // //     }
// // //     ],
// // //     "_id": "6136da86370744ab0c043768"
// // //     }
// // //     ],
// // //     "__v": 0
// // //     }

// // // const express = require("express");
// // // let obj1 = {};

// // // let obj2 = {
// // //   name: "hardik",
// // // };
// // // let obj3 = {
// // //   age: "grover",
// // // };

// // // obj1 = {
// // //   ...obj2,
// // // };
// // // // console.log(obj1);
// // // obj1 = {
// // //   ...obj3,
// // // };
// // // // obj1 = Object.bind(obj1, obj3);

// // // // console.log(obj1);

// // // let arr = [1, 2, 3, 5, 6];

// // // let a = {
// // //   name: "hardik",
// // //   age: 22,
// // // };

// // // const b = {
// // //   fsdf: {
// // //     fdf: "fsdf",
// // //   },
// // //   sdf: "20",
// // // };
// // // a = {
// // //   ...b,
// // // };
// // // // let c = {
// // // //   ...a,
// // // //   ...b,
// // // // };
// // // // console.log(c);
// // // // c = {
// // // //   ...b,
// // // // };
// // // console.log(a);

// // // Object.

// // let a = {
// //   name: "hardik",
// // };
// // let b = {
// //   age: "grover",
// // };
// // a = {
// //   ...a,
// //   ...b,
// // };
// // console.log(a);

// // // end result

// const a = {
//   openapi: "3.0.0",
//   info: { title: "user", description: "user document", version: "1.0" },
//   paths: {
//     "users/{userId}": {
//       get: {
//         operationId: "user",
//         description: "description",
//         parameters: [
//           {
//             name: "test name",
//             description: "test description",
//             required: "true",
//             in: "path",
//             type: "number",
//           },
//         ],
//       },
//     },
//   },
// };

// const b = {
//   openapi: "3.0.0",
//   info: { title: "user", description: "user document", version: "1.0" },
//   // serviceName: "service1",
//   paths: {
//     "/users/{userId}": {
//       get: {
//         operationId: "user",
//         description: "description",
//         parameters: [
//           {
//             name: "test name",
//             description: "test description",
//             required: "true",
//             in: "path",
//             type: "number",
//           },
//         ],
//       },
//     },
//   },
// };

// if (a == b) {
//   console.log("yes");
// }
// console.log("no");
/*!
 * Find the differences between two objects and push to a new object
 * (c) 2019 Chris Ferdinandi & Jascha Brinkmann, MIT License, https://gomakethings.com & https://twitter.com/jaschaio
 * @param  {Object} obj1 The original object
 * @param  {Object} obj2 The object to compare against it
 * @return {Object}      An object of differences between the two
 */
var diff = function (obj1, obj2) {
  // Make sure an object to compare is provided
  if (!obj2 || Object.prototype.toString.call(obj2) !== "[object Object]") {
    return obj1;
  }

  //
  // Variables
  //

  var diffs = {};
  var key;

  //
  // Methods
  //

  /**
   * Check if two arrays are equal
   * @param  {Array}   arr1 The first array
   * @param  {Array}   arr2 The second array
   * @return {Boolean}      If true, both arrays are equal
   */
  var arraysMatch = function (arr1, arr2) {
    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;
  };

  /**
   * Compare two items and push non-matches to object
   * @param  {*}      item1 The first item
   * @param  {*}      item2 The second item
   * @param  {String} key   The key in our object
   */
  var compare = function (item1, item2, key) {
    // Get the object type
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === "[object Undefined]") {
      diffs[key] = null;
      return;
    }

    // If items are different types
    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    // If an object, compare recursively
    if (type1 === "[object Object]") {
      var objDiff = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    // If an array, compare
    if (type1 === "[object Array]") {
      if (!arraysMatch(item1, item2)) {
        diffs[key] = item2;
      }
      return;
    }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === "[object Function]") {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };

  //
  // Compare our objects
  //

  // Loop through the first object
  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      compare(obj1[key], obj2[key], key);
    }
  }

  // Loop through the second object and find missing items
  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  // Return the object of differences
  return diffs;
};

var order1 = {
  openapi: "3.0.0",
  info: { title: "user", description: "user document", version: "1.0" },
  paths: {
    "users/{userId}": {
      get: {
        operationId: "user",
        description: "description",
        parameters: [
          {
            name: "test name",
            description: "test description",
            required: "true",
            in: "path",
            type: "number",
          },
        ],
        responses: {},
      },
    },
  },
};

var order2 = {
  openapi: "3.0.0",
  info: { title: "user", description: "user document", version: "1.0" },
  // serviceName: "service1",
  paths: {
    "/users/{userId}": {
      get: {
        operationId: "user",
        description: "description",
        parameters: [
          {
            name: "test name",
            description: "test description",
            required: "true",
            in: "path",
            type: "number",
          },
        ],
      },
    },
  },
};

console.log(diff(order1, order2));

// [1, 2, 3, 4, 5, 6]

// for(int i = 0;i< arr.length;i++){

//   print(arr[i]);

// }
